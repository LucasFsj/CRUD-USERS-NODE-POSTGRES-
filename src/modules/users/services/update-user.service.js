const AppError = require("../../../shared/errors/AppError");
class UpdateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id, { name, email }) {
    if (!id) {
     throw new AppError("User id is required", 400);
    }

    // Pelo menos um campo precisa vir
    if (name === undefined && email === undefined) {
      throw new AppError("At least one field (name or email) must be provided", 400);
    }

    // Verifica se usuário existe
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
    throw new AppError("User not found", 404);
    }

    // Normaliza email se vier
    let normalizedEmail;
    if (email !== undefined) {
      normalizedEmail = String(email).trim().toLowerCase();

      // Se o email está mudando, verificar duplicidade
      if (normalizedEmail !== existingUser.email) {
        const userWithSameEmail = await this.usersRepository.findByEmail(normalizedEmail);

        // Se existe e não é o mesmo usuário, bloqueia
        if (userWithSameEmail && Number(userWithSameEmail.id) !== Number(id)) {
        throw new AppError("Email already in use", 409);
        }
      }
    }

    const updatedUser = await this.usersRepository.update(id, {
      name: name !== undefined ? String(name).trim() : null,
      email: email !== undefined ? normalizedEmail : null,
    });

    return updatedUser;
  }
}

module.exports = UpdateUserService;