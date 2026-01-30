const { z } = require("zod");

exports.registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  }),
});

exports.loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  }),
});
