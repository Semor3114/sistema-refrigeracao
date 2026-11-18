# Sistema de Refrigeração

CRUD de equipamentos de refrigeração (geladeira, ar-condicionado, freezer, câmara fria...).

- **Back/**: Node.js + Express + PostgreSQL (padrão MVC) + Swagger
- **Front/**: React + Vite + React Router

## Como rodar

### 1. Banco
Crie o banco `refrigeracao` no PostgreSQL e rode o script `Back/banco.sql`.

### 2. Back-end
```
cd Back
cp .env.example .env   # ajuste usuário/senha/banco
npm install
npm run dev
```
API: http://localhost:3000 | Swagger: http://localhost:3000/api-docs

### 3. Front-end
```
cd Front
npm install
npm run dev
```
Acesse http://localhost:5173
