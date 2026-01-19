const AppError = require("../../../shared/errors/AppError");
const bcrypt = require("bcryptjs");

class UpdateUserPasswordService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id, { password }) {
    if (!id) {
  throw new AppError("User id is required", 400);
    }

    if (!password) {
   throw new AppError("password is required", 400);
    }

    const user = await this.usersRepository.findById(id);
    if (!user) {
   throw new AppError("user not found", 404);
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(String(password), saltRounds);

    const updatedUser = await this.usersRepository.updatePassword(id, passwordHash);
    return updatedUser;
  }
}

module.exports = UpdateUserPasswordService;