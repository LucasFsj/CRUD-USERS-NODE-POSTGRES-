const bcrypt = require("bcryptjs");
const AppError = require("../../../shared/errors/AppError");

class LoginService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);

    // Não revelar se foi email ou senha (boa prática)
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError("Invalid credentials", 401);
    }

    // Nunca retornar senha
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

module.exports = LoginService;