const { z } = require("zod");

// params: /users/:id
const userIdParamsSchema = z.object({
  id: z.coerce.number().int().positive({
    message: "id must be a positive integer",
  }),
});

// GET /users (pagination)
const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});
// validacao de usuarios
const loginBodySchema = z.object({
  email: z.string().trim().email({ message: "email must be valid" }),
  password: z.string().min(6, { message: "password must be at least 6 characters" }),
});

// POST /users
const createUserBodySchema = z.object({
  name: z.string().trim().min(1, { message: "name is required" }),
  email: z.string().trim().email({ message: "email must be valid" }),
  password: z.string().min(6, { message: "password must be at least 6 characters" }),
});

// PUT /users/:id (atualizar name/email)
const updateUserBodySchema = z
  .object({
    name: z.string().trim().min(1, { message: "name cannot be empty" }).optional(),
    email: z.string().trim().email({ message: "email must be valid" }).optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: "At least one field (name or email) must be provided",
  });

// PUT /users/:id/password
const updatePasswordBodySchema = z.object({
  password: z.string().min(6, { message: "password must be at least 6 characters" }),
});

module.exports = {
  userIdParamsSchema,
  createUserBodySchema,
  updateUserBodySchema,
  updatePasswordBodySchema,
   paginationQuerySchema,
   loginBodySchema,
};