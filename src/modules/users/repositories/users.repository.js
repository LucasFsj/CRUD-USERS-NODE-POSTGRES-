const pool = require("../../../config/database");

class UsersRepository {

  //Atualizar o password
  async updatePassword(id, passwordHash) {
    const query = `
      UPDATE users
      SET
        password = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, name, email, created_at, updated_at
    `;

    const result = await pool.query(query, [id, passwordHash]);
    return result.rows[0] || null;
  }
    async findById(id) {
    const query = `
      SELECT id, name, email, created_at, updated_at
      FROM users
      WHERE id = $1
      LIMIT 1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
    async findAll() {
    const query = `
      SELECT id, name, email, created_at, updated_at
      FROM users
      ORDER BY id DESC
    `;

    const result = await pool.query(query);
    return result.rows;
  }
  async findByEmail(email) {
    const query = `
      SELECT id, name, email, password, created_at, updated_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  async create({ name, email, password }) {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at, updated_at
    `;

    const values = [name, email, password];
    const result = await pool.query(query, values);

    return result.rows[0];
  }
   async update(id, { name, email }) {
    const query = `
      UPDATE users
      SET
        name = COALESCE($2, name),
        email = COALESCE($3, email),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, name, email, created_at, updated_at
    `;

    const values = [id, name ?? null, email ?? null];
    const result = await pool.query(query, values);

    return result.rows[0] || null;
  }
  //Função para deletar usuario
    async delete(id) {
    const query = `
      DELETE FROM users
      WHERE id = $1
      RETURNING id
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}

module.exports = UsersRepository;