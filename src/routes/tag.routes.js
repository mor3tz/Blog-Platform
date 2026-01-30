const express = require("express");

const validate = require("../middlewares/validate.middleware");

const { createTagSchema } = require("../validations/tag.validation");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const tagController = require("../controllers/tag.controller");

const router = express.Router();

router.get("/", tagController.getTags);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createTagSchema),
  tagController.createTag,
);

module.exports = router;
