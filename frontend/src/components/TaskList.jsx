import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import * as taskService from "../services/taskService";

export default function TaskList({ onEditClick, refreshKey = 0 }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationError, setOperationError] = useState(null);

  useEffect(() => {
    carregarTasks();
  }, [refreshKey]);

  const carregarTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      setOperationError(null);

      const dados = await taskService.listarTasks();
      setTasks(Array.isArray(dados) ? dados : []);
    } catch (err) {
      const mensagemErro = err.message || "Erro ao carregar tarefas";
      setError(mensagemErro);
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !confirm(
        "🗑️ Tem certeza que deseja deletar esta tarefa? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    try {
      setOperationError(null);
      await taskService.deletarTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      const mensagemErro = err.message || "Erro ao deletar tarefa";
      setOperationError(mensagemErro);
      console.error("Erro ao deletar tarefa:", err);
    }
  };

  const handleToggle = async (id) => {
    try {
      setOperationError(null);

      const task = tasks.find((t) => t.id === id);

      const atualizada = await taskService.atualizarTask(id, {
        concluida: !task.concluida,
      });

      setTasks(tasks.map((t) => (t.id === id ? atualizada : t)));
    } catch (err) {
      const mensagemErro = err.message || "Erro ao atualizar tarefa";
      setOperationError(mensagemErro);
      console.error("Erro ao atualizar tarefa:", err);
    }
  };

  const handleEdit = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);

    if (onEditClick) {
      onEditClick(taskId, task);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>⏳ Carregando tarefas...</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>

          <button
            onClick={carregarTasks}
            className="mt-2 underline font-semibold"
          >
            🔄 Tentar novamente
          </button>
        </div>
      )}

      {operationError && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>{operationError}</p>

          <button
            onClick={() => setOperationError(null)}
            className="text-sm mt-2 underline"
          >
            Fechar
          </button>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg font-semibold">
            📭 Nenhuma tarefa criada ainda
          </p>

          <p className="text-gray-500 mt-2">
            Crie uma nova tarefa no formulário acima para começar!
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            📝 Suas Tarefas ({tasks.length})
          </h2>

          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}