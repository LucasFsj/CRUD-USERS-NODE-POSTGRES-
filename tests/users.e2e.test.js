const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/config/database");

jest.setTimeout(20000);

const buildUser = () => {
  const stamp = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return {
    name: "Test User",
    email: `test-${stamp}@example.com`,
    password: "123456",
  };
};

const resetUsersTable = async () => {
  try {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  } catch (error) {
    await pool.query("DELETE FROM users");
  }
};

const createUser = async () => {
  const userData = buildUser();
  const response = await request(app).post("/users").send(userData);
  return { response, userData };
};

const loginUser = async ({ email, password }) => {
  return request(app).post("/sessions").send({ email, password });
};

beforeEach(async () => {
  await resetUsersTable();
});

afterAll(async () => {
  await pool.end();
});

describe("Users API", () => {
  it("POST /users creates a user", async () => {
    const { response, userData } = await createUser();

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email.toLowerCase());
    expect(response.body).not.toHaveProperty("password");
  });

  it("POST /sessions authenticates a user", async () => {
    const { response, userData } = await createUser();
    const loginResponse = await loginUser(userData);

    expect(response.status).toBe(201);
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
    expect(loginResponse.body).toHaveProperty("user");
    expect(loginResponse.body.user.email).toBe(userData.email.toLowerCase());
  });

  it("GET /users requires authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("JWT token is missing");
  });

  it("GET /users returns a paginated list", async () => {
    const { userData } = await createUser();
    const loginResponse = await loginUser(userData);
    const token = loginResponse.body.token;

    const response = await request(app)
      .get("/users?page=1&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body).toHaveProperty("meta");
    expect(response.body.meta).toHaveProperty("total");
  });

  it("GET /users/:id returns a user", async () => {
    const { response, userData } = await createUser();
    const loginResponse = await loginUser(userData);
    const token = loginResponse.body.token;

    const getResponse = await request(app)
      .get(`/users/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.email).toBe(userData.email.toLowerCase());
  });

  it("PUT /users/:id updates a user", async () => {
    const { response, userData } = await createUser();
    const loginResponse = await loginUser(userData);
    const token = loginResponse.body.token;

    const updateResponse = await request(app)
      .put(`/users/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Name" });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe("Updated Name");
  });

  it("PUT /users/:id/password updates password and allows login", async () => {
    const { response, userData } = await createUser();
    const loginResponse = await loginUser(userData);
    const token = loginResponse.body.token;

    const updateResponse = await request(app)
      .put(`/users/${response.body.id}/password`)
      .set("Authorization", `Bearer ${token}`)
      .send({ password: "newpass123" });

    expect(updateResponse.status).toBe(200);

    const reloginResponse = await loginUser({
      email: userData.email,
      password: "newpass123",
    });

    expect(reloginResponse.status).toBe(200);
    expect(reloginResponse.body).toHaveProperty("token");
  });

  it("DELETE /users/:id removes a user", async () => {
    const { response, userData } = await createUser();
    const loginResponse = await loginUser(userData);
    const token = loginResponse.body.token;

    const deleteResponse = await request(app)
      .delete(`/users/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.status).toBe(204);
  });
});
