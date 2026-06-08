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

  /**
   * Ao criar uma nova tarefa
   */
  const handleTaskCreate = async (data) => {
    try {
      await taskService.criarTask(data)
      // Refresh da lista
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
      throw error
    }
  }

  /**
   * Ao atualizar uma tarefa
   */
  const handleTaskUpdate = async (data) => {
    try {
      await taskService.atualizarTask(editingId, data)
      // Limpar modo edição
      setEditingId(null)
      setEditingTask(null)
      // Refresh da lista
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
      throw error
    }
  }

  /**
   * Ao clicar em editar uma tarefa na lista
   */
  const handleEditClick = (taskId, taskData) => {
    setEditingId(taskId)
    setEditingTask(taskData)
    // Scroll para o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * Cancelar modo edição
   */
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Formulário */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <TaskForm 
                onSubmit={editingId ? handleTaskUpdate : handleTaskCreate}
                initialData={editingTask}
                editingId={editingId}
              />
            </div>
          </div>

          {/* Coluna 2: Lista de Tarefas */}
          <div className="lg:col-span-2">
            <TaskList 
              key={refreshKey}
              refreshKey={refreshKey}
              onEditClick={handleEditClick}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-16">
        <p className="text-sm">
          🚀 Desenvolvido com React + Tailwind CSS
        </p>
        <p className="text-xs mt-1 text-gray-400">
          Backend: Node.js + Express + Prisma + MySQL
        </p>
      </footer>
    </div>
  )
}

export default App
