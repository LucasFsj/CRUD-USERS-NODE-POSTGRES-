const AppError = require("../../../shared/errors/AppError");

class DeleteUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id) {
    if (!id) {
      throw new AppError("User id is required", 400);
    }

    const deletedUser = await this.usersRepository.delete(id);

    if (!deletedUser) {
  throw new AppError("User not found", 404);
    }

    return;
  }
}

module.exports = DeleteUserService;