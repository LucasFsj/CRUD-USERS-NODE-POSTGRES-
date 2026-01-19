const { ZodError } = require("zod");
const AppError = require("../errors/AppError");

function validate({ bodySchema, paramsSchema, querySchema }) {
  return (req, res, next) => {
    try {
      // Validar req.body
      if (bodySchema) {
        req.body = bodySchema.parse(req.body);
      }

      // Validar req.params
      if (paramsSchema) {
        req.params = paramsSchema.parse(req.params);
      }

      // Validar req.query
      if (querySchema) {
        req.query = querySchema.parse(req.query);
      }

      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        // Pega a primeira mensagem de erro (simples e didático)
        const firstIssue = err.issues?.[0];
        const message = firstIssue?.message || "Validation error";
        return next(new AppError(message, 400));
      }

      return next(err);
    }
  };
}

module.exports = validate;