# CRUD Users API — Node.js, PostgreSQL & JWT

API REST para gerenciamento de usuários (**CRUD completo**) desenvolvida com **Node.js**, **PostgreSQL** e **arquitetura em camadas (Controller / Service / Repository)**.

O projeto inclui **validação de dados**, **hash de senha**, **login com JWT**, **rotas protegidas**, **Docker** e foi criado com foco em **aprendizado** e **portfólio profissional**.

---

## 📌 Tecnologias utilizadas

- **Node.js**
- **Express**
- **PostgreSQL**
- **pg** (driver PostgreSQL)
- **bcryptjs** (hash de senha)
- **jsonwebtoken (JWT)** (autenticação)
- **Zod** (validação de dados)
- **Docker & Docker Compose**
- **Git & GitHub**

---

## 🧱 Arquitetura do projeto

O projeto segue **arquitetura em camadas**, separando responsabilidades para facilitar manutenção, testes e escalabilidade.

### Controller
Responsável pela camada HTTP:
- recebe `req`
- chama o Service
- retorna `res`
- define status HTTP

Não contém SQL nem regra de negócio.

### Service
Responsável pelas **regras de negócio**:
- validações de regra (ex.: email duplicado)
- hash e comparação de senha
- geração de JWT
- decisões de fluxo

### Repository
Responsável pelo **acesso ao banco de dados**:
- contém apenas SQL
- utiliza `pg`
- não conhece HTTP nem regras de negócio

---

## 📂 Estrutura de pastas

src/
  server.js
  app.js

  shared/
    validation/
      users.schemas.js
      validate.js
    middlewares/
      ensureAuthenticated.js
    errors/
      AppError.js
      asyncHandler.js
      errorHandler.js
    infra/
      database/
        database.js

  modules/
    users/
      controllers/
        users.controller.js
        sessions.controller.js
      repositories/
        users.repository.js
      services/
        create-user.service.js
        list-users-paginated.service.js
        get-user-by-id.service.js
        update-user.service.js
        update-user-password.service.js
        delete-user.service.js
        login.service.js
      routes/
        users.routes.js
        sessions.routes.js

database/
  init.sql

Dockerfile
docker-compose.yml
README.md

 -  /  -
   
▶️ Como executar o projeto
🔹 Opção 1 — Executar com Docker (recomendado)
Pré-requisito: Docker Desktop instalado

Na raiz do projeto:

docker compose up --build
A API ficará disponível em:
http://localhost:3015

Para parar os containers:

docker compose down
Para remover os dados do banco:
docker compose down -v

🔹 Opção 2 — Executar localmente (sem Docker)

Pré-requisitos:
Node.js
PostgreSQL

1. Instalar dependências:
npm install
2. Criar o arquivo .env

PORT=3015

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=crud_users_db

JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1d

3. Criar tabela

Use o script:
database/init.sql

5. Rodar em desenvolvimento:
npm run dev

6.Testes
Os testes usam Jest + Supertest e fazem reset da tabela users entre casos.
Recomenda-se usar um banco de teste separado.

(Opcional) Crie .env.test com as credenciais do banco de testes.

Executar testes:
npm test


🔐 Autenticação (JWT)
O login retorna um JWT

O token deve ser enviado no header:
Authorization: Bearer SEU_TOKEN
Rotas protegidas exigem token válido

🔗 Endpoints da API

Base URL:
http://localhost:3015
➕ Criar usuário (público)
POST /users
{
  "name": "Lucas",
  "email": "lucas@email.com",
  "password": "123456"
}
Resposta:

201 Created

🔑 Login (gera JWT)
POST /sessions

{
  "email": "lucas@email.com",
  "password": "123456"
}
Resposta:

json
Copy code
{
  "user": {
    "id": 1,
    "name": "Lucas",
    "email": "lucas@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
📄 Listar usuários (protegido)
GET /users


Query params:
?page=1&limit=10

Header:
Authorization: Bearer SEU_TOKEN

Resposta:
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}

🔍 Buscar usuário por ID (protegido)
GET /users/:id

200 — encontrado

404 — não encontrado

✏️ Atualizar usuário (protegido)

PUT /users/:id
{
  "name": "Novo Nome"
}

🔐 Atualizar senha (protegido)
PUT /users/:id/password
{
  "password": "novaSenha123"
}
❌ Deletar usuário (protegido):

DELETE /users/:id
204 — sucesso
404 — não encontrado

🛡️ Validação e segurança
Validação de body, params e query com Zod

Senhas armazenadas com hash bcrypt

Autenticação com JWT

Middleware global de erros

Não expõe senha em nenhuma resposta

📄 Licença
Projeto livre para fins de estudo, aprendizado e portfólio.

👨‍💻 Autor
Desenvolvido por Lucas
Projeto focado em aprendizado de backend, arquitetura e boas práticas.
