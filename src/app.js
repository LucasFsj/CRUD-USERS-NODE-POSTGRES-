const express = require("express");
const usersRoutes = require("./modules/users/routes/users.routes");
const errorHandler = require("./shared/errors/errorHandler");

const app = express();

app.use(express.json());
app.use("/users", usersRoutes);

// Middleware global de erros (sempre por último)
app.use(errorHandler);

module.exports = app;