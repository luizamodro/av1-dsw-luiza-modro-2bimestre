// ========================================
// APP - CONFIGURAÇÃO DA APLICAÇÃO
// ========================================
// Este arquivo é responsável por:
// - Criar e configurar a aplicação Express
// - Configurar middlewares
// - Registrar as rotas
// - Preparar a aplicação para ser exportada

import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Cria a aplicação Express
const app = express();

// ========================================
// MIDDLEWARES
// ========================================

// Middleware de CORS para permitir requisições do frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// Permite que o servidor entenda JSON enviado no corpo da requisição
app.use(express.json());

// Middleware para parsing de dados URL-encoded (formulários)
app.use(express.urlencoded({ extended: true }));

// ========================================
// ROTAS
// ========================================

// Rota inicial apenas para testar se a API está funcionando
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de tarefas funcionando!",
    versao: "2.0",
    arquitetura: "MVC"
  });
});

// Registra as rotas de tarefas
app.use(tarefaRoutes);
app.use(taskRoutes);

// ========================================
// TRATAMENTO DE ROTAS NÃO ENCONTRADAS
// ========================================

// Middleware para capturar rotas não definidas (404)
app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
    metodo: req.method,
    url: req.url
  });
});

// Exporta a aplicação configurada
export default app;
