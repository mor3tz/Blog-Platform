const prisma = require("../config/prisma");
const slugify = require("slugify");

exports.createTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    const tag = await prisma.tag.create({
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });

    res.status(201).json({ tag });
  } catch (error) {
    next(error);
  }
};

exports.getTags = async (req, res, next) => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {name: "asc"},
    });

    res.json({ tags });
  } catch (error) {
    next(error);
  }
};
