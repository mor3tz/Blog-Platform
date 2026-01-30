const express = require("express");

const validate = require("../middlewares/validate.middleware");

const {
  createSchema: createPostSchema,
  updateSchema: updatePostSchema,
} = require("../validations/post.validation");

const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Blog post management
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all published posts
 *     tags:
 *       - Post
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or content
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get("/", postController.getPosts);


/**
 * @swagger
 * /posts/{slug}:
 *   get:
 *     summary: Get post by slug
 *     tags:
 *       - Post
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post detail
 *       404:
 *         description: Post not found
 */
router.get("/:slug", postController.getPostBySlug);


/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create new post
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post(
  "/",
  authMiddleware,
  validate(createPostSchema),
  postController.createPost,
);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update post
 *     tags:
 *       - Post
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
 *         description: Post updated
 */
router.put(
  "/:id",
  authMiddleware,
  validate(updatePostSchema),
  postController.updatePost,
);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete post
 *     tags:
 *       - Post
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
 *         description: Post deleted
 */
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;
