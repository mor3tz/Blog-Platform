const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/auth.routes.js");
const adminRoutes = require("./routes/admin.routes.js");
const userRoutes = require("./routes/user.routes.js");
const postRoutes = require("./routes/post.routes.js");
const commentRoutes = require("./routes/comment.routes.js");
const categoryRoutes = require("./routes/category.routes.js");
const tagRoutes = require("./routes/tag.routes.js");
const likeRoutes = require("./routes/like.routes.js");
const bookmarkRoutes = require("./routes/bookmark.routes.js");

const errorHandler = require("./middlewares/error.middleware.js");

const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.use(errorHandler);

module.exports = app;
