import { useState, useEffect } from "react";
import * as taskService from "../services/taskService";

export default function TaskForm({ onSubmit, initialData = null, editingId = null }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar dados da tarefa quando estiver editando
  useEffect(() => {
    if (editingId && initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingId, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!title.trim()) {
      setError("O título é obrigatório");
      setLoading(false);
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        completed: initialData?.completed || false,
      });
      // Limpar formulário após sucesso
      if (!editingId) {
        setTitle("");
        setDescription("");
      }
    } catch (err) {
      setError(err.message || "Erro ao salvar tarefa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? "✏️ Editar Tarefa" : "➕ Nova Tarefa"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da tarefa..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva a tarefa (opcional)..."
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {loading ? "⏳ Salvando..." : editingId ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
}
