const prisma = require("../config/prisma");
const slugify = require("slugify");

// Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, status, categoryId, tagIds } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        status,
        slug: slugify(title, { lower: true }),
        author: { connect: { id: req.user.id } },
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        tags: {
          create: tagIds.map((tagId) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: {
        category: true,
        tags: {
          include: { tag: true },
        },
        author: { select: { email: true } },
      },
    });

    res.status(201).json({ post });
  } catch (error) {
    next(error);
  }
};

// Get all posts
exports.getPosts = async (req, res, next) => {
  try {
    const { category, tag, search } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const where = {
      status: "PUBLISHED",
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    if (category) {
      where.category = { slug: category };
    }

    if (tag) {
      where.tags = { some: { slug: tag } };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { email: true } },
          tags: true,
          category: true,
        },
      }),
      prisma.post.count({ where }),
    ]);

    res.json({
      data: posts,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

// Get post by slug (public)
exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: { author: { select: { email: true } } },
    });

    if (!post || post.status !== "PUBLISHED") {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ post });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const update = await prisma.post.update({
      where: { id },
      data: req.body,
    });

    res.json({ post: update });
  } catch (error) {
    next(error);
  }
};

// Delete a post
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.post.delete({ where: { id } });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
