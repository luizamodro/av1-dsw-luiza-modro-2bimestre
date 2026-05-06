import prisma from "../config/prisma.js";

// GET
export async function listarTasks(req, res) {
  try {
    const tasks = await prisma.task.findMany({
      include: { category: true }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar tarefas" });
  }
}

// POST
export async function criarTask(req, res) {
  try {
    const { title, description, categoryId } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        categoryId
      }
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
}

// PUT/PATCH
export async function atualizarTask(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const task = await prisma.task.update({
      where: { id },
      data: req.body
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
}

// DELETE
export async function deletarTask(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    await prisma.task.delete({
      where: { id }
    });

    res.json({ mensagem: "Task deletada" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar tarefa" });
  }
}
