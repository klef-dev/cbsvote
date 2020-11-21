const express = require("express");
const exhbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 3000;

const db = require("./config/database");

db.authenticate()
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log(err);
  });
require("./app/Models/associations")();

const app = express();

app.engine(
  "hbs",
  exhbs({
    defaultLayout: "main",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/votes", require("./routes/api/votes"));
app.use("/", require("./routes/api/views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (request, response) => {
  response.render("404", { layout: "404" });
});

app.listen(port, () => {
  console.log(`Your app is being served on http://127.0.0.1:${port}`);
});
