const express = require("express");
const mongoose = require("mongoose");
const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("blogs/index", { title: "Blogs", blogs: result })
    )
    .catch((err) => console.log("blog_index", err));
};

const blog_create_post = (req, res) => {
  if (!req.body) res.send("error");
  req.body.body = req.body.body.replace(/\r\n/g, "<br>");

  // req.body.replace('/\r\n\g',"<br>");
  // console.log(req.body);
  const blog = new Blog(req.body);
  blog.author = res.locals.user.username;
  // console.log(blog.body);
  blog
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log("blog_create_post", err));
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
    .then((result) => {
      // console.log(result);
      res.render("blogs/details", { title: result.title, blog: result });
    })
    .catch((err) =>
      res.status(404).render("error", { title: "Blog not Found" })
    );
};
const blog_toggle_like = async (req, res) => {
  const id = req.params.id;
  res.locals.liked = false;
  const activeUser = res.locals.user;
  try {
    const blog = await Blog.findById(id);
    // console.log(blog);
    if (blog.likes.includes(activeUser.email)) {
      blog.likes = blog.likes.filter((usremail) => {
        return usremail !== activeUser.email;
      });
      res.locals.liked = false;
      res.json({ disliked: true });
    } else {
      blog.likes.push(activeUser.email);
      res.locals.liked = true;
      res.json({ liked: true });
    }

    // console.log(blog.likes);
    await blog.save();
  } catch (err) {
    console.log(err);
    res.status(404).render("error", { title: "Blog not Found" });
  }
};

const blog_comment_post = async (req, res) => {
  const id = req.params.id;
  const commentText = req.body.inputComment;
  const userCommented = res.locals.user.username;
  const commentCreationTime = new Date();
  const commentDate = commentCreationTime.toDateString();
  // const commentID = new mongoose.Types.ObjectId();
  // console.log(commentText,id,userCommented);
  try {
    const blog = await Blog.findById(id);
    const blogcomment ={
      userCommented,
      commentText,
      commentDate,
    }
    // console.log(blogcomment);
    blog.comments.push(blogcomment);
    await blog.save();

    // console.log(blog.comments);
    res.redirect(`/blogs/${id}`);
  } catch (err) {
    console.log(err);
    res.status(404).render("error", { title: "Blog not Found" });
  }
};

module.exports = {
  blog_index,
  blog_create_post,
  blog_create_get,
  blog_delete,
  blog_details,
  blog_toggle_like,
  blog_comment_post,
};
