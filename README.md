# CRUD Users API (Node.js + PostgreSQL)

API REST para gerenciamento de usuários (CRUD completo) com Node.js, PostgreSQL e arquitetura em camadas (Controller / Service / Repository).
Projeto focado em aprendizado e portfólio, com boas práticas de organização, validação e segurança de senhas.

## Stack
- Node.js + Express
- PostgreSQL
- pg (driver PostgreSQL)
- bcryptjs (hash de senha)
- zod (validação de dados)
- Docker + Docker Compose

## Arquitetura (Controller / Service / Repository)

### Controller
Responsável por lidar com HTTP: recebe `req`, chama o Service e retorna `res`.
Não contém SQL e evita regra de negócio pesada.

### Service
Contém regras de negócio e orquestração:
- validações de regra (ex.: email duplicado)
- decisões do fluxo
- uso de bcrypt para hash de senha

### Repository
Responsável por acesso a dados (SQL) usando `pg`.
Somente essa camada conversa com o banco.

## Estrutura de pastas

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
  shared/
    errors/
      AppError.js
      asyncHandler.js
      errorHandler.js
    validation/
      validate.js
      users.schemas.js
database/
  init.sql
docker-compose.yml
Dockerfile
Como rodar o projeto
Opção 1: Rodar com Docker (recomendado)
Pré-requisito: Docker Desktop instalado.

Na raiz do projeto:

bash
Copy code
docker compose up --build
A API ficará disponível em:

http://localhost:3015

Para parar:

bash
Copy code
docker compose down
Para apagar os dados do banco (volume):

bash
Copy code
docker compose down -v
Opção 2: Rodar local (sem Docker)
Pré-requisitos:

Node.js instalado

PostgreSQL instalado e rodando

Instalar dependências:

bash
Copy code
npm install
Criar o arquivo .env na raiz:

env
Copy code
PORT=3015
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=crud_users_db
Criar tabela (SQL):
Use o arquivo database/init.sql.

Rodar em desenvolvimento:

bash
Copy code
npm run dev
Endpoints
Base URL: http://localhost:3015

Criar usuário
POST /users

Body:

json
Copy code
{
  "name": "Lucas",
  "email": "lucas@test.com",
  "password": "123456"
}
Resposta (201):

json
Copy code
{
  "id": 1,
  "name": "Lucas",
  "email": "lucas@test.com",
  "created_at": "...",
  "updated_at": "..."
}
Listar usuários
GET /users
Resposta (200): array de usuários (sem senha)

Buscar usuário por ID
GET /users/:id

200 se existir

404 se não existir

Atualizar usuário (name/email)
PUT /users/:id

Body (exemplos):

json
Copy code
{ "name": "Novo Nome" }
json
Copy code
{ "email": "novo@email.com" }
200 se atualizar

404 se não existir

409 se email já estiver em uso

Atualizar senha
PUT /users/:id/password

Body:

json
Copy code
{ "password": "novaSenha123" }
Senha é salva com hash (bcrypt)

200 se atualizar

404 se não existir

Deletar usuário
DELETE /users/:id

204 se deletar

404 se não existir

Validações e Erros
Validação com Zod (body/params) retorna 400 com mensagem clara.

Erros de regra de negócio usam AppError e são tratados pelo middleware global.

Senhas são armazenadas como hash (bcryptjs).

Licença
Este projeto é livre para fins de estudo e portfólio.

yaml
Copy code

---

# 13.3) Commitar no GitHub (passo a passo)
Na raiz do projeto:

```bash
git status
git add README.md
git commit -m "docs: add complete README with setup and endpoints"
git push