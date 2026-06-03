// Componente de cabeçalho da aplicação
export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold">📋 Gerenciador de Tarefas</h1>
        <p className="text-blue-100 mt-2">Organize suas tarefas de forma simples e eficiente</p>
      </div>
    </header>
  );
}
