import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import * as taskService from "../services/taskService";

export default function TaskList({ onEditClick }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    carregarTasks();
  }, []);

  const carregarTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await taskService.listarTasks();
      setTasks(dados);
    } catch (err) {
      setError("Erro ao carregar tarefas. Verifique se o servidor está rodando.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja deletar esta tarefa?")) return;

    try {
      await taskService.deletarTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError("Erro ao deletar tarefa");
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const atualizada = await taskService.atualizarTask(id, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === id ? atualizada : t)));
    } catch (err) {
      setError("Erro ao atualizar tarefa");
      console.error(err);
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
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={carregarTasks}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">📭 Nenhuma tarefa criada ainda</p>
          <p className="text-gray-500 mt-2">Crie uma nova tarefa para começar!</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
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
