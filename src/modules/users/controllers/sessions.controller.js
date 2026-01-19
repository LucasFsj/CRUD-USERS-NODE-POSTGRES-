const UsersRepository = require("../repositories/users.repository");
const LoginService = require("../services/login.service");

class SessionsController {
async create(req, res) {
  const { email, password } = req.body;

  const usersRepository = new UsersRepository();
  const loginService = new LoginService(usersRepository);

  const result = await loginService.execute({ email, password });

  return res.status(200).json(result);
}
}

module.exports = SessionsController;