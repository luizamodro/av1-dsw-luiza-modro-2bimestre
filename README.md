# 🎯 AV1 - Gerenciador de Tarefas

> Avaliação 1 - Desenvolvimento de Sistemas Web (DSW)
>
> **Aluno:** Luiza Modro | **Período:** 2º Bimestre | **Turma:** 3ª TIB
>
> **Data:** Junho de 2026 | **Status:** ✅ **COMPLETO E FUNCIONAL**

---

## 📋 Visão Geral do Projeto

Aplicação web completa de **Gerenciamento de Tarefas**, desenvolvida com tecnologias modernas, seguindo padrões profissionais de arquitetura e boas práticas de desenvolvimento.

**Tema:** Sistema de tarefas com cadastro, listagem, edição e exclusão de dados (CRUD completo).

---

## 🏗 Arquitetura do Projeto

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│  http://localhost:5173                                      │
│  - Components reutilizáveis                                 │
│  - Validações robustas                                      │
│  - Tratamento de erros                                      │
│  - Styling com Tailwind CSS                                 │
└─────────────┬───────────────────────────────────────────────┘
              │ HTTP REST API (JSON)
              │ GET, POST, PUT, DELETE
              ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                        │
│  http://localhost:3000                                      │
│  - Express.js API                                           │
│  - Padrão MVC                                               │
│  - Controllers, Models, Routes                              │
│  - Prisma ORM                                               │
└─────────────┬───────────────────────────────────────────────┘
              │ SQL (Prisma)
              ↓
┌─────────────────────────────────────────────────────────────┐
│                   BANCO DE DADOS                            │
│                      MySQL 8.0+                             │
│  Tabela: `Tarefa`                                           │
│  - id, descricao, concluida, criadoEm, atualizadoEm        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tecnologias Utilizadas

### Frontend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React** | ^19.2.5 | Framework UI |
| **Vite** | ^8.0.10 | Build tool |
| **Tailwind CSS** | ^4.2.4 | Estilos |
| **JavaScript (ES6+)** | - | Linguagem |

### Backend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Node.js** | v14+ | Runtime |
| **Express.js** | ^5.2.1 | Framework HTTP |
| **Prisma** | ^5.22.0 | ORM |
| **MySQL** | 8.0+ | Banco dados |

---

## 📦 Instalação e Setup

### 1️⃣ Pré-requisitos

```bash
✅ Node.js v14+ instalado
✅ MySQL Server rodando
✅ Git configurado
```

### 2️⃣ Clonar Repositório

```bash
git clone <seu-repositorio>
cd av1-dsw-luiza-modro-2bimestre
```

### 3️⃣ Setup do Backend

```bash
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
echo 'PORT=3000
DATABASE_URL="mysql://root:@localhost:3306/db_LUIZA_MODRO_2BIMESTRE_3TIB"' > .env

# Criar banco de dados
mysql -u root -e "CREATE DATABASE db_LUIZA_MODRO_2BIMESTRE_3TIB;"

# Executar migrations
npx prisma migrate dev --name init

# Iniciar servidor
npm run dev
```

**Backend rodará em:** http://localhost:3000 ✅

### 4️⃣ Setup do Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar dev server
npm run dev
```

**Frontend rodará em:** http://localhost:5173 ✅

---

## 🚀 Como Usar a Aplicação

### 1. Acessar a Aplicação

Abra seu navegador em: **http://localhost:5173**

### 2. Criar Tarefa

```
1. Digite o título (mínimo 3 caracteres)
2. (Opcional) Adicione uma descrição
3. Clique em "Criar"
4. Tarefa aparece na lista abaixo
```

### 3. Editar Tarefa

```
1. Clique no botão ✏️ da tarefa
2. Altere os dados
3. Clique em "Atualizar"
```

### 4. Marcar como Concluída

```
1. Clique no checkbox ☑️ da tarefa
2. Tarefa receberá risco e mudará de cor
```

### 5. Deletar Tarefa

```
1. Clique no botão 🗑️ da tarefa
2. Confirme a deleção
3. Tarefa é removida permanentemente
```

---

## 📚 Estrutura de Pastas

```
av1-dsw-luiza-modro-2bimestre/
│
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── app.js                 # Configuração Express
│   │   ├── server.js              # Inicialização
│   │   ├── 📁 config/             # Configurações
│   │   │   ├── prisma.js
│   │   │   └── testConexao.js
│   │   ├── 📁 controllers/        # Lógica de negócio
│   │   │   └── tarefaController.js
│   │   ├── 📁 models/             # Acesso ao banco
│   │   │   └── tarefaModel.js
│   │   └── 📁 routes/             # Rotas da API
│   │       └── tarefaRoutes.js
│   ├── 📁 prisma/
│   │   ├── schema.prisma          # Definição do modelo
│   │   └── 📁 migrations/         # Histórico de mudanças
│   ├── .env                       # Variáveis de ambiente
│   ├── package.json
│   └── README.md                  # Documentação backend
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Header.jsx         # Cabeçalho
│   │   │   ├── TaskForm.jsx       # Formulário
│   │   │   ├── TaskList.jsx       # Lista
│   │   │   └── TaskCard.jsx       # Card
│   │   ├── 📁 services/
│   │   │   └── taskService.js     # Cliente API
│   │   ├── App.jsx                # App principal
│   │   ├── App.css                # Estilos
│   │   ├── index.css              # Tailwind
│   │   └── main.jsx               # Ponto entrada
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md                  # Documentação frontend
│
├── 📄 README.md                   # Este arquivo
└── 📄 .gitignore
```

---

## 🔌 API REST - Endpoints

### Base URL
```
http://localhost:3000
```

### Testar Conexão
```bash
GET /
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

## 📋 Operações CRUD

### 1. Listar Tarefas
```bash
GET /tarefas
```

### 2. Buscar Tarefa por ID
```bash
GET /tarefas/1
```

### 3. Criar Tarefa
```bash
POST /tarefas
Content-Type: application/json

{
  "descricao": "Fazer a lista de compras",
  "concluida": false
}
```

### 4. Atualizar Tarefa
```bash
PUT /tarefas/1
Content-Type: application/json

{
  "descricao": "Fazer a lista de compras (URGENTE)",
  "concluida": true
}
```

### 5. Deletar Tarefa
```bash
DELETE /tarefas/1
```

---

## 📊 Banco de Dados

### Tabela: `Tarefa`

| Campo | Tipo | Constraints | Descrição |
|-------|------|-----------|-----------|
| `id` | INT | PK, AUTO_INCREMENT | Identificador único |
| `descricao` | VARCHAR(255) | NOT NULL | Descrição da tarefa |
| `concluida` | BOOLEAN | DEFAULT false | Status (concluída/pendente) |
| `criadoEm` | DATETIME | DEFAULT NOW() | Data de criação |
| `atualizadoEm` | DATETIME | ON UPDATE NOW() | Última atualização |

---

## ✅ Checklist de Requisitos (AV1)

### Parte 1 - Backend ✅
- [x] Node.js + Express configurado
- [x] API REST estruturada
- [x] Prisma ORM implementado
- [x] MySQL conectado
- [x] Padrão MVC
- [x] CRUD completo (GET, POST, PUT, DELETE)
- [x] Retorna JSON
- [x] Testável via Postman/Insomnia
- [x] Documentação README
- [x] Sem duplicação de código

### Parte 2 - Frontend ✅
- [x] React SPA desenvolvido
- [x] Componentes reutilizáveis (Header, TaskForm, TaskList, TaskCard)
- [x] Consumo de API via fetch
- [x] Exibição em listagens
- [x] Operações CRUD (create, edit, delete)
- [x] Estados de loading e erro
- [x] Tailwind CSS implementado
- [x] Navegação básica
- [x] Validações robustas
- [x] Tratamento avançado de erros
- [x] Documentação README

### Repositório & Documentação ✅
- [x] Estrutura única (backend/ + frontend/)
- [x] README descritivo (backend + frontend)
- [x] Commits organizados
- [x] .gitignore configurado
- [x] Instruções de setup claras

---

## 🧪 Testando a Aplicação

### Com Postman/Insomnia

1. **Criar Tarefa:**
   - POST: `http://localhost:3000/tarefas`
   - Body: `{"descricao": "Teste", "concluida": false}`

2. **Listar Tarefas:**
   - GET: `http://localhost:3000/tarefas`

3. **Editar Tarefa:**
   - PUT: `http://localhost:3000/tarefas/1`
   - Body: `{"descricao": "Teste Atualizado", "concluida": true}`

4. **Deletar Tarefa:**
   - DELETE: `http://localhost:3000/tarefas/1`

---

## 🐛 Troubleshooting

### Backend não conecta ao MySQL

```bash
# Solução 1: Verificar se MySQL está rodando
mysql -u root

# Solução 2: Criar banco manualmente
mysql -u root -e "CREATE DATABASE db_LUIZA_MODRO_2BIMESTRE_3TIB;"

# Solução 3: Executar migrations novamente
npx prisma migrate dev
```

### Frontend não conecta ao Backend

```bash
# Verificar se backend está rodando
curl http://localhost:3000/

# Se não funcionar, iniciar backend
cd backend && npm run dev
```

### Porta já em uso

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

---

## 📈 Melhorias Futuras

- [ ] Autenticação e autorização (JWT)
- [ ] Categorias de tarefas
- [ ] Prioridades
- [ ] Filtros avançados
- [ ] Busca por texto
- [ ] Dark mode
- [ ] Notificações push
- [ ] Backup automático
- [ ] Deploy em produção

---

## 📄 Informações do Projeto

| Aspecto | Detalhes |
|--------|----------|
| **Aluno** | Luiza Modro |
| **Turma** | 3ª TIB - 2º Bimestre |
| **Escola** | Colégio UNASP |
| **Disciplina** | Desenvolvimento de Sistemas Web (DSW) |
| **Data** | Junho de 2026 |
| **Tema** | Sistema de Tarefas |
| **Status** | ✅ Completo e Funcional |

---

## 🔗 Links Úteis

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique o README no frontend/ e backend/
2. Consulte a documentação das tecnologias
3. Verifique se todas as dependências estão instaladas
4. Verifique os erros no console do navegador/terminal

---

## 📝 Licença

Projeto desenvolvido como atividade avaliativa da disciplina de Desenvolvimento de Sistemas Web (DSW) - Colégio UNASP, 2026.

---

**Desenvolvido com ❤️ por Luiza Modro**
