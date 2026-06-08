# 📋 API de Gerenciamento de Tarefas - Backend

> Parte 1 da Avaliação AV1 - Desenvolvimento de Sistemas Web (DSW)
> 
> **Status:** ✅ Funcional | **Versão:** 2.0 | **Arquitetura:** MVC

---

## 📋 Visão Geral

Backend de uma aplicação completa de gerenciamento de tarefas, desenvolvida com **Node.js + Express + Prisma ORM + MySQL**.

A API implementa um padrão **MVC** (Model-View-Controller) com operações CRUD completas via REST.

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|----------|
| **Node.js** | v14+ | Runtime JavaScript |
| **Express.js** | ^5.2.1 | Framework HTTP |
| **Prisma ORM** | ^5.22.0 | Mapeamento de banco de dados |
| **MySQL** | 8.0+ | Banco de dados relacional |
| **Nodemon** | ^3.1.14 | Auto-reload em desenvolvimento |

---

## 📦 Instalação

### 1. Pré-requisitos

Certifique-se de ter instalado:
- **Node.js** (v14+): [https://nodejs.org/](https://nodejs.org/)
- **MySQL Server** (v8.0+): [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)
  - *OU* **MariaDB** (v10.5+): [https://mariadb.org/download/](https://mariadb.org/download/)

### 2. Acessar a Pasta Backend

```bash
cd backend
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Configurar Banco de Dados

#### a) Criar o banco no MySQL

```bash
mysql -u root
```

```sql
CREATE DATABASE db_LUIZA_MODRO_2BIMESTRE_3TIB;
EXIT;
```

#### b) Configurar Variáveis de Ambiente

Crie ou edite o arquivo `.env`:

```env
# Configurações do Servidor
PORT=3000

# Banco de Dados
DATABASE_URL="mysql://root:@localhost:3306/db_LUIZA_MODRO_2BIMESTRE_3TIB"
```

**Nota:** Ajuste `root` e a senha conforme sua configuração do MySQL.

### 5. Executar Migrations (Criar Tabelas)

```bash
npx prisma migrate dev --name init
```

---

## 🚀 Como Rodar

### Desenvolvimento (com hot-reload)

```bash
npm run dev
```

Servidor iniciará em: **http://localhost:3000**

### Produção

```bash
npm start
```

---

## 📡 Endpoints da API

### Base URL
```
http://localhost:3000
```

### Testar Conexão

**GET** `/`
```
http://localhost:3000/
```

**Resposta:**
```json
{
  "mensagem": "API de tarefas funcionando!",
  "versao": "2.0",
  "arquitetura": "MVC"
}
```

---

## 📝 Operações CRUD

### 1️⃣ Listar Todas as Tarefas

```bash
GET http://localhost:3000/tarefas
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "descricao": "Fazer a lista de compras",
    "concluida": false,
    "criadoEm": "2026-06-08T12:00:00.000Z",
    "atualizadoEm": "2026-06-08T12:00:00.000Z"
  }
]
```

---

### 2️⃣ Buscar Tarefa por ID

```bash
GET http://localhost:3000/tarefas/1
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "descricao": "Fazer a lista de compras",
  "concluida": false,
  "criadoEm": "2026-06-08T12:00:00.000Z",
  "atualizadoEm": "2026-06-08T12:00:00.000Z"
}
```

---

### 3️⃣ Criar Nova Tarefa

```bash
POST http://localhost:3000/tarefas
Content-Type: application/json

{
  "descricao": "Minha primeira tarefa",
  "concluida": false
}
```

**Resposta (201 Created):**
```json
{
  "id": 3,
  "descricao": "Minha primeira tarefa",
  "concluida": false,
  "criadoEm": "2026-06-08T12:15:00.000Z",
  "atualizadoEm": "2026-06-08T12:15:00.000Z"
}
```

---

### 4️⃣ Atualizar Tarefa

```bash
PUT http://localhost:3000/tarefas/1
Content-Type: application/json

{
  "descricao": "Fazer a lista de compras (URGENTE)",
  "concluida": true
}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "descricao": "Fazer a lista de compras (URGENTE)",
  "concluida": true,
  "criadoEm": "2026-06-08T12:00:00.000Z",
  "atualizadoEm": "2026-06-08T12:20:00.000Z"
}
```

---

### 5️⃣ Deletar Tarefa

```bash
DELETE http://localhost:3000/tarefas/1
```

**Resposta (200 OK):**
```json
{
  "mensagem": "Tarefa deletada com sucesso"
}
```

---

## 🗂 Estrutura do Projeto

```
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── prisma.js
│   │   └── testConexao.js
│   ├── controllers/
│   │   └── tarefaController.js
│   ├── models/
│   │   └── tarefaModel.js
│   └── routes/
│       └── tarefaRoutes.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🧪 Testando com Postman

1. **Criar requisição GET para listar:**
   - Método: `GET`
   - URL: `http://localhost:3000/tarefas`

2. **Criar requisição POST para adicionar:**
   - Método: `POST`
   - URL: `http://localhost:3000/tarefas`
   - Body (JSON):
   ```json
   {
     "descricao": "Nova tarefa",
     "concluida": false
   }
   ```

---

## 📊 Banco de Dados

**Tabela:** `Tarefa`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | Chave primária |
| descricao | VARCHAR(255) | Texto da tarefa |
| concluida | BOOLEAN | Status |
| criadoEm | DATETIME | Data de criação |
| atualizadoEm | DATETIME | Data de atualização |

---

## ✅ Requisitos da Avaliação

- ✅ Backend com Node.js + Express
- ✅ API REST estruturada
- ✅ Prisma ORM
- ✅ MySQL conectado
- ✅ Padrão MVC
- ✅ CRUD completo
- ✅ JSON responses

---

## 👤 Autor

**Luiza Modro** - 2º Bimestre - 3ª TIB - Junho 2026
