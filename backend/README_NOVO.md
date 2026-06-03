# 📋 Gerenciador de Tarefas - Backend API

Projeto de API REST desenvolvido com Node.js, Express, Prisma e MySQL. Faz parte do projeto AV1 - Desenvolvimento de Sistemas Web (DSW).

## 🛠 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma ORM** - Mapeamento objeto-relacional
- **MySQL** - Banco de dados relacional
- **Nodemon** - Auto-restart em desenvolvimento

## 📋 Requisitos

- Node.js (v16+)
- MySQL instalado e rodando
- npm ou yarn

## 🚀 Como Rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar .env
Crie um arquivo `.env` na raiz do projeto com as configurações do banco:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
PORT=3000
NODE_ENV=development
```

**Exemplo com credenciais padrão:**
```env
DATABASE_URL="mysql://root:@localhost:3306/db_LUIZA_MODRO_2BIMESTRE_3TIB"
PORT=3000
```

### 3. Rodar as migrações do Prisma
```bash
npx prisma migrate dev
```

Isso vai:
- Criar as tabelas no banco de dados
- Gerar o Prisma Client

### 4. Iniciar o servidor

#### Desenvolvimento (com auto-reload):
```bash
npm run dev
```

#### Produção:
```bash
npm start
```

O servidor rodará em: `http://localhost:3000`

## 📚 API Endpoints

### Tasks (Tarefas)

#### GET /tasks
Lista todas as tarefas
```bash
curl http://localhost:3000/tasks
```

**Resposta:**
```json
[
  {
    "id": 1,
    "title": "Aprender React",
    "description": "Estudar componentes e hooks",
    "completed": false,
    "createdAt": "2026-06-03T10:00:00.000Z"
  }
]
```

#### GET /tasks/:id
Buscar uma tarefa específica
```bash
curl http://localhost:3000/tasks/1
```

#### POST /tasks
Criar uma nova tarefa
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nova tarefa",
    "description": "Descrição da tarefa",
    "completed": false
  }'
```

**Body obrigatório:**
- `title` (string) - Título da tarefa

**Body opcional:**
- `description` (string) - Descrição
- `completed` (boolean) - Status de conclusão

#### PUT /tasks/:id
Atualizar uma tarefa
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarefa atualizada",
    "completed": true
  }'
```

#### DELETE /tasks/:id
Deletar uma tarefa
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── tarefaController.js
│   ├── models/
│   │   ├── taskModel.js
│   │   └── tarefaModel.js
│   ├── routes/
│   │   ├── taskRoutes.js
│   │   └── tarefaRoutes.js
│   ├── config/
│   │   └── prisma.js
│   ├── app.js
│   └── server.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env
├── package.json
└── README.md
```

## 🗄️ Modelo de Dados

### Task
```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

## 🧪 Testando a API

### Com Postman
1. Importe a collection de endpoints
2. Teste cada rota com os exemplos acima

### Com cURL (terminal)
Use os comandos de exemplo acima

### Com Insomnia
Similar ao Postman, crie requisições para cada endpoint

## 📝 Tratamento de Erros

A API retorna erros estruturados:

```json
{
  "erro": "Descrição do erro"
}
```

**Códigos HTTP:**
- `200` - Sucesso
- `400` - Requisição inválida
- `404` - Recurso não encontrado
- `500` - Erro do servidor

## 🔌 Integração com Frontend

O frontend React consome esta API através do serviço `taskService.js`. Certifique-se de que:

1. O backend está rodando em `http://localhost:3000`
2. CORS está habilitado (já configurado em `app.js`)
3. O banco de dados está conectado

## 🛡️ Segurança

- Validação de entrada em todos os endpoints
- Tratamento de erros apropriado
- Proteção contra SQL injection (via Prisma)

## 📞 Suporte

Para dúvidas sobre a estrutura ou endpoints, consulte a documentação do Express e Prisma.

---

**Desenvolvido para AV1 - DSW | 2º Bimestre**
