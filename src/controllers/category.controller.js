const prisma = require("../config/prisma");
const slugify = require("slugify");

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });

    res.status(201).json({ category });
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.json({ categories });
  } catch (error) {
    next(error);
  }
};
