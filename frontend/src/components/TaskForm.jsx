import { useState, useEffect } from "react";
import * as taskService from "../services/taskService";

export default function TaskForm({ onSubmit, initialData = null, editingId = null }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const MIN_TITLE = 3;
  const MAX_TITLE = 100;
  const MAX_DESCRIPTION = 500;

  // Carregar dados da tarefa quando estiver editando
  useEffect(() => {
    if (editingId && initialData) {
      setTitle(initialData.descricao || "");
      setDescription(initialData.description || "");
      setError(null);
      setSuccess(null);
    } else {
      resetForm();
    }
  }, [editingId, initialData]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setError(null);
    setSuccess(null);
  };

  // Validar formulário
  const validarFormulario = () => {
    const titleTrim = title.trim();
    const descTrim = description.trim();

    // Título vazio
    if (!titleTrim) {
      setError("⚠️ O título é obrigatório");
      return false;
    }

    // Título muito curto
    if (titleTrim.length < MIN_TITLE) {
      setError(`⚠️ O título deve ter no mínimo ${MIN_TITLE} caracteres`);
      return false;
    }

    // Título muito longo
    if (titleTrim.length > MAX_TITLE) {
      setError(`⚠️ O título não pode ter mais de ${MAX_TITLE} caracteres`);
      return false;
    }

    // Descrição muito longa
    if (descTrim.length > MAX_DESCRIPTION) {
      setError(`⚠️ A descrição não pode ter mais de ${MAX_DESCRIPTION} caracteres`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validar
    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      const dadosTarefa = {
        descricao: title.trim(),
        concluida: initialData?.concluida || false,
      };

      if (editingId) {
        // Modo edição
        await taskService.atualizarTask(editingId, dadosTarefa);
        setSuccess("✅ Tarefa atualizada com sucesso!");
      } else {
        // Modo criação
        await taskService.criarTask(dadosTarefa);
        setSuccess("✅ Tarefa criada com sucesso!");
        resetForm();
      }

      // Chamar callback
      if (onSubmit) {
        await onSubmit(dadosTarefa);
      }

      // Limpar mensagem após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const mensagemErro = err.message || "Erro ao salvar tarefa";
      setError(mensagemErro);
      console.error("Erro ao submeter formulário:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? "✏️ Editar Tarefa" : "➕ Nova Tarefa"}
      </h2>

      {/* Mensagem de erro */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* Mensagem de sucesso */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p className="font-semibold">{success}</p>
        </div>
      )}

      {/* Campo Título */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da tarefa..."
          maxLength={MAX_TITLE}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          disabled={loading}
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">
            Mínimo: {MIN_TITLE} caracteres
          </span>
          <span className="text-xs text-gray-500">
            {title.length}/{MAX_TITLE}
          </span>
        </div>
      </div>

      {/* Campo Descrição */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Descrição (opcional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva a tarefa (opcional)..."
          maxLength={MAX_DESCRIPTION}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          disabled={loading}
        />
        <div className="text-right mt-1">
          <span className="text-xs text-gray-500">
            {description.length}/{MAX_DESCRIPTION}
          </span>
        </div>
      </div>

      {/* Botão Submit */}
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "⏳ Salvando..." : editingId ? "📝 Atualizar" : "➕ Criar"}
      </button>

      {/* Botão Cancelar (se estiver editando) */}
      {editingId && (
        <button
          type="button"
          onClick={resetForm}
          disabled={loading}
          className="w-full mt-2 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition disabled:cursor-not-allowed"
        >
          ❌ Cancelar
        </button>
      )}
    </form>
  );
}
