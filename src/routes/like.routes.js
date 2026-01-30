const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { toggleLike } = require("../controllers/like.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Like
 *   description: Like management
 */


/**
 * @swagger
 * /likes/post/{postId}:
 *   post:
 *     summary: Toggle like for a post
 *     tags:
 *       - Like
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like toggled successfully 
 */
router.post("/post/:postId", authMiddleware, toggleLike);

module.exports = router;
