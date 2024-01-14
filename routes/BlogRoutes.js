const express = require("express");
const { authUser, checkUser } = require("../middlewares/authMiddleware");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.blog_index);

router.post("/", checkUser, authUser, blogController.blog_create_post);

router.get("/create", authUser, blogController.blog_create_get);

router.delete("/:id", authUser, blogController.blog_delete);

router.get("/:id", blogController.blog_details);

router.put("/:id", authUser, checkUser, blogController.blog_toggle_like);

router.post("/comment/create/:id",authUser,checkUser,blogController.blog_comment_post);

module.exports = router;
