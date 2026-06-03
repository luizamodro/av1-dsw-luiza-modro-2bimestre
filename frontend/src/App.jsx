import { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import * as taskService from './services/taskService'
import './App.css'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [editingId, setEditingId] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  const handleTaskCreate = async (data) => {
    try {
      await taskService.criarTask(data)
      setRefreshKey(prev => prev + 1) // Refresh lista
      alert('✅ Tarefa criada com sucesso!')
    } catch (error) {
      throw error
    }
  }

  const handleTaskUpdate = async (data) => {
    try {
      await taskService.atualizarTask(editingId, data)
      setEditingId(null)
      setEditingTask(null)
      setRefreshKey(prev => prev + 1) // Refresh lista
      alert('✅ Tarefa atualizada com sucesso!')
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-1">
            <TaskForm 
              onSubmit={editingId ? handleTaskUpdate : handleTaskCreate}
              initialData={editingTask}
              editingId={editingId}
            />
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null)
                  setEditingTask(null)
                }}
                className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition"
              >
                ❌ Cancelar Edição
              </button>
            )}
          </div>

          {/* Lista de Tarefas */}
          <div className="lg:col-span-2">
            <TaskList 
              key={refreshKey}
              onEditClick={(taskId, taskData) => {
                setEditingId(taskId)
                setEditingTask(taskData)
                window.scrollTo(0, 0)
              }}
            />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-12">
        <p>Desenvolvido com React + Tailwind CSS | API Backend em Node.js + Express</p>
      </footer>
    </div>
  )
}

export default App
  )
}

export default App
