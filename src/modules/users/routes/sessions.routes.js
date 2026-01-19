const { Router } = require("express");

const asyncHandler = require("../../../shared/errors/asyncHandler");
const validate = require("../../../shared/validation/validate");

const { loginBodySchema } = require("../../../shared/validation/users.schemas");

const SessionsController = require("../controllers/sessions.controller");

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post(
  "/",
  validate({ bodySchema: loginBodySchema }),
  asyncHandler((req, res) => sessionsController.create(req, res))
);

module.exports = sessionsRoutes;