# CRUD Users API — Node.js, PostgreSQL & JWT

API REST para **gerenciamento de usuários (CRUD completo)** desenvolvida com **Node.js**, **PostgreSQL** e **arquitetura em camadas (Controller / Service / Repository)**.

O projeto inclui **validação de dados**, **hash de senha**, **autenticação com JWT**, **rotas protegidas**, **testes automatizados** e **Docker**, sendo construído com foco em **aprendizado**, **boas práticas de backend** e **portfólio profissional**.

---

## 🎯 Objetivo do Projeto

- Consolidar conceitos de CRUD e REST API
- Aplicar arquitetura em camadas
- Trabalhar autenticação e autorização com JWT
- Garantir segurança básica (hash de senha, validação)
- Utilizar Docker para padronizar o ambiente
- Criar uma base sólida para projetos backend maiores

---

## 🧰 Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- pg (driver PostgreSQL)
- bcryptjs (hash de senha)
- jsonwebtoken (JWT)
- Zod (validação de dados)
- Jest + Supertest (testes automatizados)
- Docker & Docker Compose
- Git & GitHub

---

## 🏗️ Arquitetura do Projeto

O projeto segue **arquitetura em camadas**, separando responsabilidades para facilitar **manutenção**, **testes** e **escalabilidade**.

### 📦 Controller
Responsável pela camada HTTP:
- Recebe `req`
- Chama o Service
- Retorna `res`
- Define status HTTP

> Não contém SQL nem regras de negócio.

---

### 🧠 Service
Responsável pelas regras de negócio:
- Validações de regra (ex: email duplicado)
- Hash e comparação de senha
- Geração de JWT
- Decisões de fluxo

---

### 🗄️ Repository
Responsável pelo acesso ao banco de dados:
- Contém apenas SQL
- Utiliza `pg`
- Não conhece HTTP nem regras de negócio

---

## 📁 Estrutura de Pastas

```txt
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

tests/
  setup.js
  users.e2e.test.js

jest.config.js
Dockerfile
docker-compose.yml
README.md

🚀 Como Executar o Projeto
🔹 Opção 1 — Executar com Docker (recomendado)

Pré-requisito: Docker Desktop instalado

Na raiz do projeto:
docker compose up --build

A API ficará disponível em:
http://localhost:3015

Parar os containers:
docker compose down

Remover volumes (dados do banco):
docker compose down -v

Opção 2 — Executar localmente (sem Docker)

Pré-requisitos:
Node.js
PostgreSQL

Instalar dependências: npm install

Criar o arquivo .env:
PORT=3015

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=crud_users_db

JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1d

Criar as tabelas
Utilize o script: database/init.sql

Rodar em desenvolvimento: npm run dev

🧪 Testes Automatizados

Testes E2E com Jest + Supertest
Reset da tabela users entre os testes
Recomenda-se banco de dados exclusivo para testes
(Opcional) Crie um .env.test com credenciais do banco de testes.
Executar testes: npm test

🔐 Autenticação (JWT)
O login retorna um JWT.
O token deve ser enviado no header: Authorization: Bearer SEU_TOKEN
Rotas protegidas exigem token válido.

🌐 Endpoints da API
Base URL:"http://localhost:3015

➕ Criar usuário (público)
POST /users
{
  "name": "Lucas",
  "email": "lucas@email.com",
  "password": "123456"
}
Resposta: 201 Created

🔑 Login (gera JWT)
POST /sessions
{
  "email": "lucas@email.com",
  "password": "123456"
}
Resposta:
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
Query params: ?page=1&limit=10
Header: Authorization: Bearer SEU_TOKEN

Resposta:
{
  "data": [],
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
🔒 Atualizar senha (protegido)
PUT /users/:id/password
{
  "password": "novaSenha123"
}
🗑️ Deletar usuário (protegido)

DELETE /users/:id

204 — sucesso

404 — não encontrado

🛡️ Validação e Segurança
Validação de body, params e query com Zod
Senhas armazenadas com hash bcrypt
Autenticação via JWT
Middleware global de erros
Nenhuma resposta expõe senha

📄 Licença
Projeto livre para fins de estudo, aprendizado e portfólio.
👨‍💻 Autor
Lucas Felipe Silva Jorge
Projeto focado em aprendizado de backend, arquitetura em camadas e boas práticas.




