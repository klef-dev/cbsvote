const nodemailer = require("nodemailer");
const nhbs = require("nodemailer-express-handlebars");

const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_HOST,
  secure: true, // use TLS
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const options = {
  viewEngine: {
    extname: ".hbs", // handlebars extension
    layoutsDir: "views/mail/", // location of handlebars templates
    defaultLayout: "main", // name of main template
    partialsDir: "views/mail/", // location of your subtemplates aka. header, footer etc
  },
  viewPath: "views/mail",
  extName: ".hbs",
};
transporter.use("compile", nhbs(options));

exports.transporter = transporter;
