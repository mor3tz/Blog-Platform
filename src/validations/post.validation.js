const { z } = require("zod");

const createSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    content: z.string().min(3),
    status: z.enum(["DRAFT", "PUBLISHED"]),
    categoryId: z.string().uuid().optional(),
    tagIds: z.array(z.string().uuid()).optional(),
  }),
});

const updateSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(3).optional(),
    status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
    categoryId: z.string().uuid().optional(),
    tagIds: z.array(z.string().uuid()).optional(),
  }),
});

module.exports = {
  createSchema,
  updateSchema,
};