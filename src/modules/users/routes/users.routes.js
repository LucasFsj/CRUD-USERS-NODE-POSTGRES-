const { Router } = require("express");
const UsersController = require("../controllers/users.controller");
const asyncHandler = require("../../../shared/errors/asyncHandler");
const validate = require("../../../shared/validation/validate");

const {
  userIdParamsSchema,
  createUserBodySchema,
  updateUserBodySchema,
  updatePasswordBodySchema,
} = require("../../../shared/validation/users.schemas");

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get("/", asyncHandler((req, res) => usersController.index(req, res)));

usersRoutes.get(
  "/:id",
  validate({ paramsSchema: userIdParamsSchema }),
  asyncHandler((req, res) => usersController.show(req, res))
);

usersRoutes.post(
  "/",
  validate({ bodySchema: createUserBodySchema }),
  asyncHandler((req, res) => usersController.create(req, res))
);

usersRoutes.put(
  "/:id/password",
  validate({ paramsSchema: userIdParamsSchema, bodySchema: updatePasswordBodySchema }),
  asyncHandler((req, res) => usersController.updatePassword(req, res))
);

usersRoutes.put(
  "/:id",
  validate({ paramsSchema: userIdParamsSchema, bodySchema: updateUserBodySchema }),
  asyncHandler((req, res) => usersController.update(req, res))
);

usersRoutes.delete(
  "/:id",
  validate({ paramsSchema: userIdParamsSchema }),
  asyncHandler((req, res) => usersController.delete(req, res))
);
module.exports = usersRoutes;