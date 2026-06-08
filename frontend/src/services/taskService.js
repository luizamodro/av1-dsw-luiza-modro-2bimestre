// Serviço de API para consumir o backend

const API_URL = "http://localhost:3000";
const TIMEOUT = 10000; // 10 segundos

// Função auxiliar para tratar erros de forma consistente
function tratarErro(erro, contexto) {
  console.error(`${contexto}:`, erro);

  // Erro de conexão/rede
  if (erro instanceof TypeError && erro.message === "Failed to fetch") {
    throw new Error(
      "🔴 Servidor não está respondendo. Verifique se está rodando em http://localhost:3000"
    );
  }

  // Timeout
  if (erro.name === "AbortError") {
    throw new Error("⏱️ Requisição expirou. Servidor muito lento.");
  }

  // Erro já formatado
  if (erro.message && erro.message.includes("🔴")) {
    throw erro;
  }

  // Erro genérico
  throw new Error(`Erro: ${erro.message || "Falha na operação"}`);
}

// Função auxiliar para fazer fetch com timeout
async function fetchComTimeout(url, opcoes = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      ...opcoes,
      signal: controller.signal,
    });

    if (!response.ok) {
      const mensagensErro = {
        400: "Dados inválidos",
        404: "Recurso não encontrado",
        500: "Erro no servidor",
      };
      throw new Error(
        mensagensErro[response.status] || `Erro ${response.status}`
      );
    }

    return response;
  } finally {
    clearTimeout(timeout);
  }
}

// GET - Listar todas as tarefas
export async function listarTasks() {
  try {
    const response = await fetchComTimeout(`${API_URL}/tarefas`);
    return await response.json();
  } catch (erro) {
    tratarErro(erro, "Erro ao listar tarefas");
  }
}

// GET - Buscar uma tarefa por ID
export async function buscarTaskPorId(id) {
  try {
    const response = await fetchComTimeout(`${API_URL}/tarefas/${id}`);
    return await response.json();
  } catch (erro) {
    tratarErro(erro, "Erro ao buscar tarefa");
  }
}

// POST - Criar uma nova tarefa
export async function criarTask(data) {
  try {
    const response = await fetchComTimeout(`${API_URL}/tarefas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (erro) {
    tratarErro(erro, "Erro ao criar tarefa");
  }
}

// PUT - Atualizar uma tarefa
export async function atualizarTask(id, data) {
  try {
    const response = await fetchComTimeout(`${API_URL}/tarefas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (erro) {
    tratarErro(erro, "Erro ao atualizar tarefa");
  }
}

// DELETE - Deletar uma tarefa
export async function deletarTask(id) {
  try {
    const response = await fetchComTimeout(`${API_URL}/tarefas/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (erro) {
    tratarErro(erro, "Erro ao deletar tarefa");
  }
}
