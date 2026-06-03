export default function TaskCard({ task, onDelete, onToggle, onEdit }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed || false}
              onChange={() => onToggle(task.id)}
              className="w-5 h-5 cursor-pointer"
            />
            <h3
              className={`text-lg font-semibold ${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="text-gray-600 mt-2 ml-8">{task.description}</p>
          )}

          <div className="text-sm text-gray-400 mt-2 ml-8">
            {task.createdAt && new Date(task.createdAt).toLocaleDateString("pt-BR")}
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(task.id)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
