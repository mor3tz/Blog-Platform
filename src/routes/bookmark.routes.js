const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { toggleBookmark } = require("../controllers/bookmark.controller");

const router = express.Router();

router.post("/:postId", authMiddleware, toggleBookmark);

module.exports = router;
