const { z } = require("zod");

exports.createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(3),
  }),
});
