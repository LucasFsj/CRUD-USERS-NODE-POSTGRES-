const bcrypt = require("bcryptjs");
const AppError = require("../../../shared/errors/AppError");

class CreateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }) {
    // Validação básica (nível júnior, mas já profissional)
    if (!name || !email || !password) {
      throw new AppError("name, email and password are required", 400);
    }

    // Normalização simples
    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await this.usersRepository.findByEmail(normalizedEmail);
    if (existingUser) {
    throw new AppError("Email already in use", 409);
    }

     // 1) Define o "custo" do bcrypt 
    const saltRounds = 10;

     // 2) Gera o hash da senha
    const passwordHash = await bcrypt.hash(String(password), saltRounds);

    // Salva no banco o hash, não a senha original
    const user = await this.usersRepository.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: passwordHash,
    });

    return user;
  }
}

module.exports = CreateUserService;