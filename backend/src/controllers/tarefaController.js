// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

/**
 * Lista todas as tarefas
 * @route GET /tarefas
 */
export async function listar(req, res) {
  try {
    const tarefas = await TarefaModel.listar();
    res.json(tarefas);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error.message);
    res.status(500).json({ erro: "Erro ao listar tarefas" });
  }
}

/**
 * Busca uma tarefa específica pelo ID
 * @route GET /tarefas/:id
 */
export async function buscarPorId(req, res) {
  try {
    const { id } = req.params;

    // Valida o id
    if (!id || isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const tarefa = await TarefaModel.buscarPorId(id);

    // Se não encontrar, retorna 404
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(tarefa);
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error.message);
    res.status(500).json({ erro: "Erro ao buscar tarefa" });
  }
}

/**
 * Cria uma nova tarefa
 * @route POST /tarefas
 */
export async function criar(req, res) {
  try {
    const { descricao, concluida } = req.body;

    // Valida campo obrigatório
    if (!descricao || typeof descricao !== "string" || descricao.trim() === "") {
      return res.status(400).json({ erro: "Descrição é obrigatória" });
    }

    // Valida campo opcional
    if (concluida !== undefined && typeof concluida !== "boolean") {
      return res.status(400).json({ erro: "concluida deve ser boolean" });
    }

    const tarefa = await TarefaModel.criar({ descricao, concluida });

    res.status(201).json({
      mensagem: "Tarefa criada com sucesso!",
      tarefa
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error.message);
    res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
}

/**
 * Atualiza uma tarefa existente
 * @route PUT /tarefas/:id
 */
export async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { descricao, concluida } = req.body;

    // Valida o id
    if (!id || isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    // Valida descrição se foi enviada
    if (descricao !== undefined && (typeof descricao !== "string" || descricao.trim() === "")) {
      return res.status(400).json({ erro: "Descrição inválida" });
    }

    // Valida concluida se foi enviado
    if (concluida !== undefined && typeof concluida !== "boolean") {
      return res.status(400).json({ erro: "concluida deve ser boolean" });
    }

    const tarefa = await TarefaModel.atualizar(id, { descricao, concluida });

    // Se não encontrar, retorna 404
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({
      mensagem: "Tarefa atualizada com sucesso!",
      tarefa
    });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error.message);
    res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
}

/**
 * Exclui uma tarefa
 * @route DELETE /tarefas/:id
 */
export async function excluir(req, res) {
  try {
    const { id } = req.params;

    // Valida o id
    if (!id || isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const tarefa = await TarefaModel.excluir(id);

    // Se não encontrar, retorna 404
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({
      mensagem: "Tarefa excluída com sucesso!",
      tarefa
    });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error.message);
    res.status(500).json({ erro: "Erro ao excluir tarefa" });
  }
}
