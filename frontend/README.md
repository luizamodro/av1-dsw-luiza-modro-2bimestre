# 📋 Gerenciador de Tarefas - Frontend React

Interface interativa para o gerenciamento de tarefas, desenvolvida com React, Tailwind CSS e Vite. Consome a API REST do backend.

## 🛠 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para UI
- **Vite** - Build tool e dev server rápido
- **Tailwind CSS** - Framework CSS utilitário
- **JavaScript (ES6+)** - Linguagem de programação

## 📋 Requisitos

- Node.js (v16+)
- npm ou yarn
- Backend rodando em `http://localhost:3000`

## 🚀 Como Rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

O frontend rodará em: `http://localhost:5173` (ou a porta indicada no terminal)

### 3. Construir para produção
```bash
npm run build
```

### 4. Preview da build de produção
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Cabeçalho da aplicação
│   │   ├── TaskForm.jsx        # Formulário de criação/edição
│   │   ├── TaskCard.jsx        # Card individual de tarefa
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
