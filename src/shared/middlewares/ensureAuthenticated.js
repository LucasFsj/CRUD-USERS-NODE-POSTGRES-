const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}

module.exports = ensureAuthenticated;