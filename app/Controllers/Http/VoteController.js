const { verifyJWT } = require("../../Middleware/verifyToken");
const { randomErr } = require("../../Middleware/vote");
const Vote = require("../../Models/Vote");
const Nominee = require("../../Models/Nominee");
const Category = require("../../Models/Category");

class VoteController {
  static async vote(request, response) {
    const { id, category } = request.body;
    if (!id) {
      return response.json({ msg: "Nominee Id not provided", error: true });
    }
    if (!category) {
      return response.json({ msg: "Category not provided", error: true });
    }
    try {
      const user = await verifyJWT(request.token);
      let lastname = user.name.split(" ").slice(-1).join(" ");
      lastname = lastname.replace(/^\w/, (c) => c.toUpperCase());

      if (user.programme != "Economics") {
        return response.json({
          msg: "Sorry this is currently opened to only Economics students",
          error: true,
        });
      }

      try {
        const nominee = await Nominee.findOne({ where: { id, category } });
        if (!nominee) {
          return response.json({ msg: "Can not find nominee", error: true });
        }

        try {
          const checkVote = await Vote.findOne({
            where: { reg_no: user.reg_no, category },
          });
          if (checkVote) {
            return response.json({
              msg: randomErr("vote", lastname),
              error: true,
            });
          }
        } catch (error) {
          return response.json({ msg: "Query error", error: true });
        }

        try {
          const vote = await Vote.create({
            reg_no: user.reg_no,
            nominee_id: id,
            category,
          });
          await nominee.update({
            vote: nominee.vote + 3,
          });
          try {
            const categories = await Category.findOne({
              where: { title: category },
            });
            await categories.update({
              total: categories.total + 1,
            });
            response.json({ vote });
          } catch (error) {
            return response.json({ msg: "Query error", error: true });
          }
        } catch (error) {
          return response.json({ msg: "Query error", error: true });
        }
      } catch (error) {
        return response.json({ msg: "Query error", error: true });
      }
    } catch (error) {
      response.json({ msg: randomErr("auth"), error: true });
    }
  }
}

module.exports = VoteController;
