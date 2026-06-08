# � Gerenciador de Tarefas - Frontend

> Parte 2 da Avaliação AV1 - Desenvolvimento de Sistemas Web (DSW)
>
> **Status:** ✅ Funcional | **Framework:** React 19.2.5 | **Styling:** Tailwind CSS 4.2.4

---

## 📋 Visão Geral

Frontend moderno de uma aplicação de gerenciamento de tarefas desenvolvida em **React + Tailwind CSS + Vite**.

A aplicação é uma SPA (Single Page Application) que consome a API REST do backend via fetch, com tratamento robusto de erros e validações completas.

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|----------|
| **React** | ^19.2.5 | Biblioteca UI |
| **Vite** | ^8.0.10 | Build tool e dev server |
| **Tailwind CSS** | ^4.2.4 | Framework CSS utilitário |
| **ESLint** | ^10.2.1 | Linter para código |
| **JavaScript (ES6+)** | - | Linguagem principal |

---

## 📦 Instalação

### 1. Pré-requisitos

Certifique-se de ter:
- **Node.js** (v14+): [https://nodejs.org/](https://nodejs.org/)
- **Backend rodando** em `http://localhost:3000`

### 2. Acessar a Pasta Frontend

```bash
cd frontend
```

### 3. Instalar Dependências

```bash
npm install
```

---

## 🚀 Como Rodar

### Desenvolvimento (com hot-reload)

```bash
npm run dev
```

**Aplicação abrirá em:** http://localhost:5173

### Produção

```bash
npm run build
npm run preview
```

---

## 🗂 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Cabeçalho da aplicação
│   │   ├── TaskForm.jsx            # Formulário de criar/editar
│   │   ├── TaskList.jsx            # Lista de tarefas
│   │   └── TaskCard.jsx            # Card individual de tarefa
│   │
│   ├── services/
│   │   └── taskService.js          # Cliente HTTP (fetch)
│   │
│   ├── pages/                      # (vazio - SPA simples)
│   ├── assets/                     # Recursos estáticos
│   ├── App.jsx                     # Componente raiz
│   ├── App.css                     # Estilos globais
│   ├── index.css                   # Estilos do Tailwind
│   └── main.jsx                    # Ponto de entrada
│
├── public/                         # Arquivos públicos
├── index.html                      # HTML base
├── vite.config.js                  # Configuração Vite
├── eslint.config.js                # Configuração ESLint
├── package.json                    # Dependências e scripts
└── README.md                       # Este arquivo
```

---

## 🎨 Componentes

### 1️⃣ Header.jsx
**Cabeçalho da aplicação**
- Título: "📋 Gerenciador de Tarefas"
- Estilo: Azul vibrante (`bg-blue-600`)

### 2️⃣ TaskForm.jsx
**Formulário para criar/editar tarefas**

**Validações:**
- ✅ Título obrigatório (3-100 caracteres)
- ✅ Descrição opcional (até 500 caracteres)
- ✅ Feedback visual de caracteres
- ✅ Estado de loading durante envio

### 3️⃣ TaskList.jsx
**Lista de tarefas com gerenciamento de estado**

**Funcionalidades:**
- 📡 Carrega tarefas do backend
- ⏳ Estado de carregamento
- 🔴 Tratamento de erros com retry
- 🗑️ Deleção com confirmação
- ✅ Toggle de status

### 4️⃣ TaskCard.jsx
**Card individual de tarefa**

**Exibe:**
- ☑️ Checkbox para marcar como concluída
- 📝 Descrição da tarefa
- 📅 Data de criação formatada
- ✏️ Botão editar | 🗑️ Botão deletar
- 🏷️ Badge de status

---

## 📡 Serviço de API (taskService.js)

**Base URL:** `http://localhost:3000`

Funções disponíveis:
```javascript
await taskService.listarTasks()        // GET /tarefas
await taskService.criarTask(data)      // POST /tarefas
await taskService.atualizarTask(id, data)  // PUT /tarefas/:id
await taskService.deletarTask(id)      // DELETE /tarefas/:id
```

**Tratamento Automático de Erros:**
- 🔴 Detecta servidor offline
- ⏱️ Timeout após 10 segundos
- 🚨 Mensagens customizadas por status HTTP

---

## 🧪 Testando a Aplicação

### 1️⃣ Verificar Backend
```bash
curl http://localhost:3000/
```

### 2️⃣ Iniciar Frontend
```bash
npm run dev
```

### 3️⃣ Testar Funcionalidades
- **Criar:** Digite título + clique "Criar"
- **Editar:** Clique ✏️ → altere → clique "Atualizar"  
- **Marcar:** Clique no checkbox
- **Deletar:** Clique 🗑️ → confirme

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Servidor não respondendo" | Verifique se backend está em http://localhost:3000 |
| Porta 5173 em uso | Mude em `vite.config.js` ou mate processo |
| Estilos não carregam | Execute `npm install && npm run dev` |
| Dados não salvam | Confirme: backend rodando, MySQL conectado, banco criado |

---

## 📊 Integração Frontend-Backend

**Fluxo:**
React → HTTP/fetch → Express API → Prisma → MySQL → Resposta JSON

**Campos de Tarefa:**
- `id` - INT (leitura)
- `descricao` - STRING (leitura/escrita)
- `concluida` - BOOLEAN (leitura/escrita)
- `criadoEm` - DATETIME (leitura)

---

## 🚀 Scripts NPM

```bash
npm run dev        # Desenvolvimento
npm run build      # Build produção
npm run preview    # Preview build
npm run lint       # Verificar código
```

---

## ✨ Features Implementadas

- ✅ CRUD Completo (Create, Read, Update, Delete)
- ✅ Validações robustas de entrada
- ✅ Tratamento avançado de erros
- ✅ Loading states com spinner
- ✅ Feedback visual (sucesso/erro)
- ✅ Responsivo (mobile-first)
- ✅ Confirmação antes de deletar
- ✅ Contador de caracteres
- ✅ Badges de status

---

## 📈 Melhorias Futuras

- [ ] Autenticação (JWT)
- [ ] localStorage (offline mode)
- [ ] Categorias de tarefas
- [ ] Filtros e busca
- [ ] Dark mode
- [ ] Notificações (toasts)
- [ ] React Router (múltiplas páginas)

---

## ✅ Requisitos da Avaliação (AV1)

- ✅ React SPA desenvolvido
- ✅ Componentes reutilizáveis
- ✅ Consumo de API (fetch)
- ✅ Exibição em listagens
- ✅ Operações CRUD
- ✅ Loading/Error states
- ✅ Tailwind CSS
- ✅ Navegação básica
- ✅ Tratamento robusto de erros

---

## 👤 Autor

**Luiza Modro** - 2º Bimestre - 3ª TIB - Junho 2026
│   │   └── TaskList.jsx        # Lista de tarefas
│   ├── pages/
│   │   └── (páginas específicas, se houver)
│   ├── services/
│   │   └── taskService.js      # Serviço de API (fetch)
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos customizados
│   ├── index.css               # Estilos globais
│   ├── main.jsx                # Ponto de entrada
│   └── assets/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Componentes Principais

### Header
Exibe o título e descrição da aplicação.

### TaskForm
Formulário para criar e editar tarefas. Features:
- Validação de entrada
- Estado de loading
- Mensagens de erro
- Reset automático após sucesso

### TaskCard
Representa uma tarefa individual. Permite:
- Marcar como concluída (checkbox)
- Editar (botão ✏️)
- Deletar (botão 🗑️)
- Ver data de criação

### TaskList
Lista todas as tarefas. Features:
- Carregamento inicial
- Mensagem de lista vazia
- Tratamento de erros com botão "tentar novamente"
- Atualização automática após operações

## 🔌 Integração com API

O serviço `taskService.js` fornece as seguintes funções:

```javascript
listarTasks()              // GET /tasks
buscarTaskPorId(id)       // GET /tasks/:id
criarTask(data)           // POST /tasks
atualizarTask(id, data)   // PUT /tasks/:id
deletarTask(id)           // DELETE /tasks/:id
```

**URL da API:** `http://localhost:3000`

## 🎯 Funcionalidades

✅ **Listagem de Tarefas** - Exibe todas as tarefas do banco
✅ **Criar Tarefa** - Formulário para adicionar novas tarefas
✅ **Editar Tarefa** - Atualizar título e descrição
✅ **Marcar como Concluída** - Toggle do status
✅ **Deletar Tarefa** - Remover tarefas
✅ **Loading States** - Indicadores visuais de carregamento
✅ **Error Handling** - Mensagens de erro e retry
✅ **Responsivo** - Funciona em mobile, tablet e desktop
✅ **Tailwind CSS** - Estilo moderno e profissional

## 🎨 Design System (Tailwind CSS)

### Cores Principais
- **Azul (Blue)** - Ações principais, cabeçalho
- **Amarelo (Yellow)** - Editar
- **Vermelho (Red)** - Deletar, erros
- **Verde (Green)** - Sucesso

### Layout
- Grid responsivo com 1 coluna em mobile
- Layout de 3 colunas em desktop (1 para formulário, 2 para lista)
- Espaçamento consistente
- Sombras e transições suaves

## 🚀 Como Usar

1. **Criar uma tarefa:**
   - Preencha o campo "Título"
   - Adicione uma descrição (opcional)
   - Clique em "Criar"

2. **Editar uma tarefa:**
   - Clique no ícone ✏️ da tarefa
   - Modifique os dados no formulário
   - Clique em "Atualizar"
   - Para cancelar: clique em "Cancelar Edição"

3. **Marcar como concluída:**
   - Clique no checkbox da tarefa
   - A tarefa será riscada visualmente

4. **Deletar uma tarefa:**
   - Clique no ícone 🗑️
   - Confirme a exclusão no modal

## ⚙️ Configurações

Edite a URL da API em `src/services/taskService.js` se necessário:

```javascript
const API_URL = "http://localhost:3000";
```

## 🧪 Testando

### Pré-requisitos
- Backend rodando em `http://localhost:3000`
- Banco de dados conectado
- Terminal aberto na pasta `frontend`

### Passos
1. Execute `npm run dev`
2. Abra `http://localhost:5173` no navegador
3. Teste as funcionalidades:
   - Crie uma tarefa
   - Edite a tarefa criada
   - Marque como concluída
   - Delete a tarefa

## 📱 Responsividade

- **Mobile (< 640px):** 1 coluna, formulário acima da lista
- **Tablet (640px - 1024px):** Layout adaptado
- **Desktop (> 1024px):** 3 colunas (formulário | lista)

## 🛡️ Validações

- Título obrigatório (não pode estar vazio)
- Descrição é opcional
- Tratamento de erros de conexão com API
- Confirmação ao deletar

## 📝 Estado da Aplicação

- **Loading:** Exibe spinner enquanto carrega tarefas
- **Error:** Mostra mensagem de erro com opção de retry
- **Empty:** Mensagem especial quando não há tarefas
- **Success:** Feedback visual ao criar/atualizar/deletar

## 🔗 Links Úteis

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 💡 Próximas Melhorias (Opcional)

- Adicionar filtros (por status, data)
- Busca de tarefas
- Ordenação customizável
- Persistência local com localStorage
- Autenticação de usuário
- Histórico de tarefas

## 🤝 Contribuindo

Este é um projeto educacional para AV1 - DSW.

## 📞 Suporte

Para dúvidas sobre React, Tailwind ou integração, consulte as documentações oficiais.

---

**Desenvolvido para AV1 - DSW | 2º Bimestre**
