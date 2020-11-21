const { verifyJWT } = require("../../Middleware/verifyToken");
const Nominee = require("../../Models/Nominee");
const Category = require("../../Models/Category");

function convertCat(category) {
  if (category == "facemale") {
    category = "CBS STAR (Male)";
  }
  if (category == "facefemale") {
    category = "CBS STAR (Female)";
  }
  if (category == "freshmale") {
    category = "Fresher of the year (Male)";
  }
  if (category == "freshfemale") {
    category = "Fresher of the year (Female)";
  }
  if (category == "impactmale") {
    category = "Most Impactful (Male)";
  }
  if (category == "impactfemale") {
    category = "Most Impactful (Female)";
  }
  if (category == "elitemale") {
    category = "CBS Elite of the Year (Male)";
  }
  if (category == "elitefemale") {
    category = "CBS Elite of the Year (Female)";
  }
  if (category == "innovativemale") {
    category = "Most Innovative (Male)";
  }
  if (category == "innovativefemale") {
    category = "Most Innovative (Female)";
  }
  if (category == "sociablemale") {
    category = "Most Sociable (Male)";
  }
  if (category == "sociablefemale") {
    category = "Most Sociable (Female)";
  }
  if (category == "fashionmale") {
    category = "Most Fashionable (Male)";
  }
  if (category == "fashionfemale") {
    category = "Most Fashionable (Female)";
  }
  if (category == "sportmale") {
    category = "Sportsman (Male)";
  }
  if (category == "sportfemale") {
    category = "Sportsman (Female)";
  }
  if (category == "popularmale") {
    category = "Most Popular (Male)";
  }
  if (category == "popularfemale") {
    category = "Most Popular (Female)";
  }
  if (category == "effectivemale") {
    category = "Effective Manager of the Year (Male)";
  }
  if (category == "effectivefemale") {
    category = "Effective Manager of the Year (Female)";
  }
  return category;
}

class HomeController {
  static async index(request, response) {
    try {
      const user = await verifyJWT(request.token);
      response.render("index", { user, token: request.token });
    } catch (error) {
      response.clearCookie("tokenizeMe");
      response.render("index");
    }
  }

  static async register(request, response) {
    try {
      await verifyJWT(request.token);
      response.redirect("/");
    } catch (error) {
      response.clearCookie("tokenizeMe");
      response.render("auth/register", { layout: "auth" });
    }
  }

  static async login(request, response) {
    try {
      await verifyJWT(request.token);
      response.redirect("/");
    } catch (error) {
      response.clearCookie("tokenizeMe");
      response.render("auth/login", { layout: "auth" });
    }
  }

  static logout(request, response) {
    response.clearCookie("tokenizeMe");
    response.redirect("/");
  }

  static async category(request, response) {
    try {
      const categories = await Category.findAll();
      let cats = [];
      let name = "";
      categories.forEach(category => {
        let { title } = category;
        name = convertCat(title);
        cats.push({
          title,
          name
        });
      });
      try {
        const user = await verifyJWT(request.token);
        response.render("categories", {
          layout: "cat",
          user,
          token: request.token,
          cats
        });
      } catch (error) {
        response.clearCookie("tokenizeMe");
        response.render("categories", { layout: "cat", cats });
      }
    } catch (error) {}
  }

  static async vote(request, response) {
    const { link } = request.params;
    let name = "";
    if (
      link == "facemale" ||
      link == "facefemale" ||
      link == "freshmale" ||
      link == "freshfemale" ||
      link == "impactmale" ||
      link == "impactfemale" ||
      link == "elitemale" ||
      link == "elitefemale" ||
      link == "innovativemale" ||
      link == "innovativefemale" ||
      link == "sociablemale" ||
      link == "sociablefemale" ||
      link == "fashionmale" ||
      link == "fashionfemale" ||
      link == "sportmale" ||
      link == "sportfemale" ||
      link == "popularmale" ||
      link == "popularfemale" ||
      link == "effectivemale" ||
      link == "effectivefemale"
    ) {
      name = convertCat(link);
      try {
        const nominee = await Nominee.findAll({ where: { category: link } });
        const nominees = [];

        nominee.forEach(nominee => {
          let { id, username, image } = nominee;
          nominees.push({
            id,
            username,
            image
          });
        });

        try {
          const category = await Category.findOne({ where: { title: link } });
          const next_category_id = category.id + 1;
          const next_category = await Category.findOne({
            where: { id: next_category_id }
          });
          let next_category_title = null;
          if (next_category) {
            next_category_title = next_category.title;
          }

          const prev_category_id = category.id - 1;
          const prev_category = await Category.findOne({
            where: { id: prev_category_id }
          });
          let prev_category_title = null;
          if (prev_category) {
            prev_category_title = prev_category.title;
          }
          try {
            const user = await verifyJWT(request.token);
            response.render("vote", {
              layout: "vote",
              user,
              token: request.token,
              name,
              link,
              nominees,
              next_category_title,
              prev_category_title
            });
          } catch (error) {
            response.clearCookie("tokenizeMe");
            response.render("vote", {
              layout: "vote",
              name,
              link,
              nominees,
              next_category_title,
              prev_category_title
            });
          }
        } catch (error) {
          response.render("vote", {
            layout: "vote",
            name,
            link,
            nominees
          });
        }
      } catch (error) {
        response.render("vote", {
          layout: "vote",
          name,
          link
        });
      }
    } else {
      response.render("404", { layout: "404" });
    }
  }
}

module.exports = HomeController;
