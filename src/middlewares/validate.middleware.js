

module.exports = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    next();
  } catch (err) {
    if (err?.issues) {
      return res.status(400).json({
        message: "validation error",
        errors: err.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
    }

    next(err);
  }
};
