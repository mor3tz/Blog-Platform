const express = require("express");

const validate = require("../middlewares/validate.middleware");

const { createCommentSchema } = require("../validations/comment.validation");

const commentController = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment management
 */

/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: Get comments by post ID
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get("/post/:postId", commentController.getCommentsByPost);

/**
 * @swagger
 * /comments/post/{postId}:
 *   post:
 *     summary: Create comment on a post
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post(
  "/post/:postId",
  authMiddleware,
  validate(createCommentSchema),
  commentController.createComment,
);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete comment
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 */
router.delete("/:id", authMiddleware, commentController.deleteComment);

module.exports = router;
