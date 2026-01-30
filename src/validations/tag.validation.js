const { z } = require("zod");

exports.createTagSchema = z.object({
    body: z.object({
        name: z.string().min(3),
    }),
});