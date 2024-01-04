const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/BlogRoutes");
const { render } = require("ejs");
const path = require('path');
const app = express();

const port = process.env.PORT||3000;

//database connect  mongoDb
const mongoUrl = `mongodb+srv://gladiatorpandey:cD0YLRAQl4z2vYyj@cluster0.dsbtzea.mongodb.net/Blogs?retryWrites=true&w=majority`;

mongoose
  .connect(mongoUrl)
  .then((res) => app.listen(port))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname + "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use('/blogs',blogRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).render("error", { title: "Error", status });
});
