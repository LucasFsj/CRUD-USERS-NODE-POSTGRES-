const AppError = require("../../../shared/errors/AppError");

class GetUserByIdService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id) {
    if (!id) {
     throw new AppError("User id is required", 400);
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
 throw new AppError("User not found", 404);
    }

    return user;
  }
}

module.exports = GetUserByIdService;
