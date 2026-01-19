const AppError = require("./AppError");

function errorHandler(err, req, res, next) {
  // Se for um erro que a gente controla (AppError), usamos status e mensagem dele
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Caso contrário, é erro inesperado (bug, falha de DB, etc.)
  console.error(err);

  return res.status(500).json({ message: "Internal server error" });
}

module.exports = errorHandler;