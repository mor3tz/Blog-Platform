const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  (req, res) => {
    res.json({
      message: "🥳 Admin dashboard",
    });
  },
);

module.exports = router;