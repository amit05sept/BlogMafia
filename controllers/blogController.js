const express = require("express");
const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("blogs/index", { title: "Blogs", blogs: result })
    )
    .catch((err) => console.log("blog_index",err));
};

const blog_create_post = (req, res) => {
  if (!req.body) res.send("error");
  const blog = new Blog(req.body);
  blog.author = res.locals.user.username;
  blog
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log("blog_create_post",err));
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create new Blog" });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).render("error", { title: "404" });
      }
      res.json({ redirect: "/" });
    })
    .catch((err) => console.log("blog_delete", err));
};
 
const blog_details = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  Blog.findById(id)
    .then((result) =>
     { 
      // console.log(result);
      res.render("blogs/details", { title: result.title, blog: result })}
    )
    .catch((err) =>
      res.status(404).render("error", { title: "Blog not Found" })
    );
};

module.exports = {
  blog_index,
  blog_create_post,
  blog_create_get,
  blog_delete,
  blog_details,
};
