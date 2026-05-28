// ========================================
// MODEL - CAMADA DE DADOS COM PRISMA
// ========================================
// Esta camada é responsável por:
// - Armazenar os dados no banco de dados usando Prisma
// - Implementar a lógica de negócio
// - Realizar operações CRUD (Create, Read, Update, Delete)

import { prisma } from "../config/prisma.js";

// ========================================
// OPERAÇÕES CRUD
// ========================================

/**
 * Lista todas as tarefas cadastradas
 * @returns {Promise<Array>} - Promise com array de todas as tarefas
 */
export async function listar() {
  try {
    const tarefas = await prisma.tarefa.findMany({
      orderBy: { criadoEm: "desc" }
    });
    return tarefas;
  } catch (error) {
    console.error("Erro ao listar tarefas:", error.message);
    throw error;
  }
}

/**
 * Busca uma tarefa específica pelo id
 * @param {number} id - ID da tarefa a ser buscada
 * @returns {Promise<Object|null>} - Promise com a tarefa encontrada ou null
 */
export async function buscarPorId(id) {
  try {
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) }
    });
    return tarefa || null;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    console.error("Erro ao buscar tarefa por ID:", error.message);
    throw error;
  }
}

/**
 * Cria uma nova tarefa
 * @param {Object} dados - Dados da tarefa { descricao, concluida? }
 * @returns {Promise<Object>} - Promise com a tarefa criada
 */
export async function criar(dados) {
  try {
    const tarefa = await prisma.tarefa.create({
      data: {
        descricao: dados.descricao.trim(),
        concluida: dados.concluida || false
      }
    });
    return tarefa;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error.message);
    throw error;
  }
}

/**
 * Atualiza uma tarefa existente
 * @param {number} id - ID da tarefa a ser atualizada
 * @param {Object} dados - Dados a atualizar { descricao?, concluida? }
 * @returns {Promise<Object|null>} - Promise com a tarefa atualizada ou null se não encontrar
 */
export async function atualizar(id, dados) {
  try {
    const tarefa = await prisma.tarefa.update({
      where: { id: parseInt(id) },
      data: {
        ...(dados.descricao && { descricao: dados.descricao.trim() }),
        ...(dados.concluida !== undefined && { concluida: dados.concluida })
      }
    });
    return tarefa;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    console.error("Erro ao atualizar tarefa:", error.message);
    throw error;
  }
}

/**
 * Exclui uma tarefa
 * @param {number} id - ID da tarefa a ser excluída
 * @returns {Promise<Object|null>} - Promise com a tarefa excluída ou null se não encontrar
 */
export async function excluir(id) {
  try {
    const tarefa = await prisma.tarefa.delete({
      where: { id: parseInt(id) }
    });
    return tarefa;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    console.error("Erro ao excluir tarefa:", error.message);
    throw error;
  }
}
