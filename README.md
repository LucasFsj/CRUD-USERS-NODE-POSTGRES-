# CRUD Users API — Node.js + PostgreSQL

API REST para gerenciamento de usuários (CRUD completo), desenvolvida com **Node.js**, **PostgreSQL** e **arquitetura em camadas (Controller / Service / Repository)**.

Projeto criado com foco em **aprendizado**, **boas práticas** e **portfólio profissional**, incluindo validações, segurança de senhas e execução via Docker.

---

## 📌 Tecnologias utilizadas

- **Node.js**
- **Express**
- **PostgreSQL**
- **pg** (driver PostgreSQL)
- **bcryptjs** (hash de senha)
- **Zod** (validação de dados)
- **Docker & Docker Compose**
- **Git & GitHub**

---

## 🧱 Arquitetura do projeto

O projeto utiliza **arquitetura em camadas**, separando responsabilidades para facilitar manutenção, testes e escalabilidade.

### Controller
Responsável pela camada HTTP:
- recebe `req`
- chama o Service
- retorna `res`

Não contém SQL nem regras de negócio complexas.

### Service
Responsável pelas **regras de negócio**:
- validações de regra (ex.: email duplicado)
- uso de bcrypt para hash de senha
- decisões de fluxo

### Repository
Responsável pelo **acesso ao banco de dados**:
- contém apenas SQL
- utiliza `pg`
- não conhece HTTP nem regras de negócio

---

## 📂 Estrutura de pastas

```txt
src/
  app.js
  server.js
  config/
    database.js
  modules/
    users/
      controllers/
        users.controller.js
      repositories/
        users.repository.js
      routes/
        users.routes.js
      services/
        create-user.service.js
        list-users.service.js
        get-user-by-id.service.js
        update-user.service.js
        delete-user.service.js
        update-user-password.service.js
      validation/
        users.schemas.js
  shared/
    errors/
      AppError.js
      asyncHandler.js
      errorHandler.js
    validation/
      validate.js
database/
  init.sql
Dockerfile
docker-compose.yml
README.md
▶️ Como executar o projeto
🔹 Opção 1 — Executar com Docker (recomendado)

Pré-requisito: Docker Desktop instalado

Na raiz do projeto, execute:

docker compose up --build


A API ficará disponível em:

http://localhost:3015


Para parar os containers:

docker compose down


Para remover os dados do banco (volume):

docker compose down -v

🔹 Opção 2 — Executar localmente (sem Docker)

Pré-requisitos:

Node.js instalado

PostgreSQL instalado e rodando

1. Instalar dependências
npm install

2. Criar o arquivo .env
PORT=3015
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=crud_users_db

3. Criar a tabela

Utilize o script SQL disponível em:

database/init.sql

4. Rodar em desenvolvimento
npm run dev

🔗 Endpoints da API

Base URL:

http://localhost:3015

➕ Criar usuário

POST /users

Body:

{
  "name": "Lucas",
  "email": "lucas@test.com",
  "password": "123456"
}


Resposta (201):

{
  "id": 1,
  "name": "Lucas",
  "email": "lucas@test.com",
  "created_at": "...",
  "updated_at": "..."
}

📄 Listar usuários

GET /users

Retorna lista de usuários

Não retorna senha

🔍 Buscar usuário por ID

GET /users/:id

200 — usuário encontrado

404 — usuário não encontrado

✏️ Atualizar usuário

PUT /users/:id

Body (exemplos):

{ "name": "Novo Nome" }

{ "email": "novo@email.com" }


200 — atualizado

404 — não encontrado

409 — email já em uso

🔐 Atualizar senha

PUT /users/:id/password

Body:

{
  "password": "novaSenha123"
}


Senha armazenada com hash bcrypt

200 — atualizado

404 — não encontrado

❌ Deletar usuário

DELETE /users/:id

204 — deletado com sucesso

404 — não encontrado

🛡️ Validações e tratamento de erros

Validação de dados com Zod

Middleware global de erros

Erros de regra tratados com AppError

Senhas armazenadas com hash (bcryptjs)

📄 Licença

Projeto livre para fins de estudo, aprendizado e portfólio.

👨‍💻 Autor

Desenvolvido por Lucas
Projeto focado em aprendizado de backend, arquitetura e boas práticas.
