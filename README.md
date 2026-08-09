# ScrumBook Backend

Node.js + TypeScript + Express + PostgreSQL backend with Swagger/OpenAPI.

## Current module

User CRUD:

- GET /api/users
- GET /api/users/:id
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

## Swagger

After starting the server:

http://localhost:4000/api-docs

Raw OpenAPI JSON:

http://localhost:4000/api-docs.json

## Setup

1. Create a PostgreSQL database named `scrumbook`.
2. Copy `.env.example` to `.env`.
3. Update PostgreSQL credentials.
4. Run `database/001_users.sql` in DBeaver.
5. Install dependencies:

```bash
npm install
```

6. Start development server:

```bash
npm run dev
```

## Health check

GET http://localhost:4000/api/health

## Existing seed user

Email: uler@gmail.com

Authentication/password handling is intentionally not included yet.
