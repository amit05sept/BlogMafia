const express = require("express");
const { authUser } = require("../middlewares/authMiddleware");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/",blogController.blog_index);

router.post("/",blogController.blog_create_post);

router.get("/create",authUser, blogController.blog_create_get);

router.delete("/:id",authUser, blogController.blog_delete);

router.get("/:id", blogController.blog_details);

module.exports = router;
