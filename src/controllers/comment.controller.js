const prisma = require("../config/prisma");

// Create Comment
exports.createComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.status !== "PUBLISHED") {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: req.user.id,
        postId,
      },
    });

    res.status(201).json({ comment });
  } catch (err) {
    next(err);
  }
};

// Get Comment by Post (Public)
exports.getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "asc" },
      include: { user: { select: { email: true } } },
    });

    res.json({
      comments,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Commnet (Owner / Admin)
exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.comment.delete({ where: { id } });

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
