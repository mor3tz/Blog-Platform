const { z } = require("zod");

exports.createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(3),
  }),
});
