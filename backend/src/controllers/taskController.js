import * as TaskModel from "../models/taskModel.js";

export async function listarTasks(req, res) {
  try {
    const tasks = await TaskModel.listar();
    return res.json(tasks);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    return res.status(500).json({ erro: "Erro ao buscar tarefas" });
  }
}

export async function buscarTaskPorId(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const task = await TaskModel.buscarPorId(id);
    if (!task) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    return res.json(task);
  } catch (error) {
    console.error("Erro ao buscar tarefa por ID:", error);
    return res.status(500).json({ erro: "Erro ao buscar tarefa" });
  }
}

export async function criarTask(req, res) {
  try {
    const { title, description, completed, categoryId } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({ erro: "Descrição deve ser uma string" });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({ erro: "Completed deve ser boolean" });
    }

    if (categoryId !== undefined && Number.isNaN(Number(categoryId))) {
      return res.status(400).json({ erro: "categoryId deve ser um número" });
    }

    const task = await TaskModel.criar({
      title: title.trim(),
      description: description?.trim(),
      completed,
      categoryId: categoryId !== undefined ? Number(categoryId) : undefined
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
}

export async function atualizarTask(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const { title, description, completed, categoryId } = req.body;
    const data = {};

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ erro: "Título inválido" });
      }
      data.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({ erro: "Descrição inválida" });
      }
      data.description = description.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({ erro: "Completed deve ser boolean" });
      }
      data.completed = completed;
    }

    if (categoryId !== undefined) {
      if (Number.isNaN(Number(categoryId))) {
        return res.status(400).json({ erro: "categoryId deve ser um número" });
      }
      data.categoryId = Number(categoryId);
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ erro: "Nenhum campo para atualizar" });
    }

    const task = await TaskModel.atualizar(id, data);
    if (!task) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    return res.json(task);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
}

export async function deletarTask(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const task = await TaskModel.excluir(id);
    if (!task) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    return res.json({ mensagem: "Tarefa excluída com sucesso", task });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    return res.status(500).json({ erro: "Erro ao excluir tarefa" });
  }
}
