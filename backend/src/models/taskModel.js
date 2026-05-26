import { prisma } from "../config/prisma.js";

export async function listar() {
  return prisma.task.findMany();
}

export async function buscarPorId(id) {
  return prisma.task.findUnique({
    where: { id }
  });
}

export async function criar(data) {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      completed: data.completed,
      categoryId: data.categoryId
    }
  });
}

export async function atualizar(id, data) {
  try {
    return await prisma.task.update({
      where: { id },
      data
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}

export async function excluir(id) {
  try {
    return await prisma.task.delete({
      where: { id }
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}
