const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user,
  });
});

module.exports = router;
