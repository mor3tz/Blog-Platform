const prisma = require("../config/prisma");

exports.toggleBookmark = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const existing = await prisma.bookmark.findUnique({
      where: {
        userId: req.res.id,
        postId,
      },
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: {
          id: existing.id,
        },
      });

      return res.json({ bookmarked: false });
    }

    await prisma.bookmark.create({
      data: {
        userId: req.user.id,
        postId,
      },
    });

    res.json({ bookmarked: true });
  } catch (err) {
    next(err);
  }
};
