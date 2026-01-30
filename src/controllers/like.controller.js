const prisma = require("../config/prisma");

exports.toggleLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const existing = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: req.user.id,
          postId,
        }
      },
    });

    if (existing) {
      await prisma.like.delete({
        where: {
          id: existing.id,
        },
      });

      return res.json({ liked: false });
    }

    await prisma.like.create({
      data: {
        userId: req.user.id,
        postId,
      },
    });

    res.json({ liked: true });
  } catch (err) {
    next(err);
  }
};
