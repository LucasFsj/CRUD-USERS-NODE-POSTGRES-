const UsersRepository = require("../repositories/users.repository");
const CreateUserService = require("../services/create-user.service");
const ListUsersService = require("../services/list-users.service");
const GetUserByIdService = require("../services/get-user-by-id.service");
const UpdateUserService = require("../services/update-user.service");
const DeleteUserService = require("../services/delete-user.service");
const UpdateUserPasswordService = require("../services/update-user-password.service");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const usersRepository = new UsersRepository();
    const createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute({ name, email, password });

    return res.status(201).json(user);
  }

  async index(req, res) {
    const usersRepository = new UsersRepository();
    const listUsersService = new ListUsersService(usersRepository);

    const users = await listUsersService.execute();

    return res.status(200).json(users);
  }

  async show(req, res) {
    const { id } = req.params;

    const usersRepository = new UsersRepository();
    const getUserByIdService = new GetUserByIdService(usersRepository);

    const user = await getUserByIdService.execute(id);

    return res.status(200).json(user);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;

    const usersRepository = new UsersRepository();
    const updateUserService = new UpdateUserService(usersRepository);

    const user = await updateUserService.execute(id, { name, email });

    return res.status(200).json(user);
  }

  async updatePassword(req, res) {
    const { id } = req.params;
    const { password } = req.body;

    const usersRepository = new UsersRepository();
    const updateUserPasswordService = new UpdateUserPasswordService(usersRepository);

    const user = await updateUserPasswordService.execute(id, { password });

    return res.status(200).json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    const usersRepository = new UsersRepository();
    const deleteUserService = new DeleteUserService(usersRepository);

    await deleteUserService.execute(id);

    return res.status(204).send();
  }
}

module.exports = UsersController;