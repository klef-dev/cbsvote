const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
require("tls").DEFAULT_MIN_VERSION = "TLSv1";
const User = require("../../Models/User");
const { transporter } = require("../../Middleware/mailer");
const verifyJWT = require("../../Middleware/verifyToken");

class UserController {
  static async login(request, response) {
    let { reg_no, password } = request.body;
    let errors = [];
    if (!reg_no) {
      errors.push({
        text: "Please provide your registeration number",
        field: "reg_no",
      });
    }
    if (!password) {
      errors.push({
        text: "Enter your password",
        field: "password",
      });
    }
    if (errors.length > 0) {
      return response.json({
        errors,
        reg_no,
        password,
      });
    }
    try {
      const findUser = await User.findOne({ where: { reg_no } });
      if (!findUser) {
        return response.json({
          msg: "One of your credential is wrong and I won't tell you the one",
          error: true,
        });
      }
      const match = await bcrypt.compare(password, findUser.password);
      if (match) {
        const user = {
          id: findUser.id,
          reg_no,
        };
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        response.cookie("tokenizeMe", token, {
          maxAge: 3600000,
          httpOnly: true,
        });
        response.json({ token });
      } else {
        response.json({
          msg: "One of your credential is wrong and I won't tell you which one",
          error: true,
        });
      }
    } catch (error) {
      response.json({ msg: "Database error", error: true });
    }
  }

  static async register(request, response) {
    const { reg_no } = request.body;
    const errors = [];
    if (!reg_no) {
      errors.push({
        text: "Please provide your registeration number",
        field: "reg_no",
      });
    }
    if (errors.length > 0) {
      return response.json({ errors });
    }
    try {
      const { data } = await axios.get(`${process.env.LMU_API}/${reg_no}`);
      if (data == null) {
        return response.json({
          msg:
            "Hmmm 🌚😏. This reg number looks strange to me. Please visit the LMU ADMISSIONS page.",
          error: true,
        });
      }
      const { fullname, email, programme } = data;
      const username = email.substring(0, email.lastIndexOf("@"));
      const password = UserController.generatePass(5);
      const hashPassword = await bcrypt.hash(password, 10);

      // Check if registeration number already exists
      try {
        const checkReg = await User.findOne({ where: { reg_no } });
        if (checkReg) {
          return response.json({
            msg: "Registration number already in use",
            error: true,
          });
        }
      } catch (error) {
        return response.json({ msg: "Database error", error: true });
      }

      const mailData = {
        from: "cbs@klefcodes.net",
        to: email,
        subject: "Verify your account to vote",
        template: "index",
        context: {
          name: fullname,
          email,
          password,
        },
      };

      try {
        await transporter.sendMail(mailData);
      } catch (error) {
        return response.json({
          msg: `Couldn't send mail to ${email}`,
          error,
        });
      }

      // Create User
      try {
        await User.create({
          name: fullname,
          email,
          reg_no,
          username,
          password: hashPassword,
          programme,
          position: "Student",
        });
        response.json({
          msg: "Check your webmail for your 5 string password.",
          error: false,
        });
      } catch (error) {
        response.json({ msg: "Database error", error });
      }
    } catch (error) {
      response.json({ msg: "Couldn't connect to LMU server", error: true });
    }
  }

  static async getCurrentUser(request, response) {
    try {
      const user = await verifyJWT(request.token);
      if (!user) {
        return res.json({ msg: "Account disabled or deleted", error: true });
      }
      console.log(user);
      return response.json({ user });
    } catch (error) {
      response.json({ msg: "Invalid JWT or expired JWT token", error: true });
    }
  }

  static generatePass(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
module.exports = UserController;
