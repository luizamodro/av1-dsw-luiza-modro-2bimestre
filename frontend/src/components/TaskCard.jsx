export default function TaskCard({ task, onDelete, onToggle, onEdit }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Checkbox e Título */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.concluida || false}
              onChange={() => onToggle(task.id)}
              className="w-5 h-5 cursor-pointer accent-blue-600"
              title={task.concluida ? "Marcar como pendente" : "Marcar como concluída"}
            />
            <h3
              className={`text-lg font-semibold transition ${
                task.concluida ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.descricao}
            </h3>
          </div>

          {/* Data de criação */}
          <div className="text-xs text-gray-400 mt-2 ml-8">
            {task.criadoEm && 
              new Date(task.criadoEm).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(task.id)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded transition text-sm font-medium"
            title="Editar tarefa"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition text-sm font-medium"
            title="Deletar tarefa"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Indicador de status */}
      <div className="mt-3 ml-8">
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
            task.concluida
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {task.concluida ? "✅ Concluída" : "⏳ Pendente"}
        </span>
      </div>
    </div>
  );
}
