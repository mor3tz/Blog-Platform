const express = require("express");

const validate = require("../middlewares/validate.middleware");

const { createCategorySchema } = require("../validations/category.validation");

const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", categoryController.getCategories);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createCategorySchema),
  categoryController.createCategory,
);

module.exports = router;
