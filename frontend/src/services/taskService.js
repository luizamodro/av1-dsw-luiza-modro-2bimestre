// Serviço de API para consumir o backend

const API_URL = "http://localhost:3000";

// GET - Listar todas as tarefas
export async function listarTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error(`Erro ao listar tarefas: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    throw error;
  }
}

// GET - Buscar uma tarefa por ID
export async function buscarTaskPorId(id) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar tarefa: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    throw error;
  }
}

// POST - Criar uma nova tarefa
export async function criarTask(data) {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erro ao criar tarefa: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
}

// PUT - Atualizar uma tarefa
export async function atualizarTask(id, data) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar tarefa: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
}

// DELETE - Deletar uma tarefa
export async function deletarTask(id) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ao deletar tarefa: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    throw error;
  }
}
