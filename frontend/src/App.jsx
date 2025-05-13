import React, { useState } from "react";
import { TodoProvider, useTodo } from "./contexts/TodoContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";

// Main Todo App Component
function TodoApp() {
  const [filter, setFilter] = useState("all");
  const { todos, loading, error } = useTodo();

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
      <Header />
      <div className="py-8 px-4 md:px-0">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            Manage Your Tasks
          </h1>
          <div className="mb-6">
            <TodoForm />
          </div>

          <TodoFilter filter={filter} setFilter={setFilter} />

          {loading ? (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center px-4 py-2 text-blue-700">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading tasks...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4 px-4 py-2 bg-white rounded-lg shadow-sm">
                <span className="text-sm font-medium text-gray-700">
                  {filteredTodos.length}{" "}
                  {filteredTodos.length === 1 ? "task" : "tasks"}{" "}
                  {filter !== "all" ? `(${filter})` : ""}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {todos.filter((todo) => !todo.completed).length} remaining
                </span>
              </div>

              <div className="space-y-3">
                {filteredTodos.map((todo) => (
                  <div key={todo._id}>
                    <TodoItem todo={todo} />
                  </div>
                ))}

                {filteredTodos.length === 0 && (
                  <div className="w-full text-center py-8 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500">
                      {filter === "all"
                        ? "No tasks yet. Add one above!"
                        : filter === "active"
                        ? "No active tasks"
                        : "No completed tasks"}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// App Wrapper with Authentication
function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AuthProvider>
      <TodoProvider>
        <AppContent
          showRegister={showRegister}
          setShowRegister={setShowRegister}
        />
      </TodoProvider>
    </AuthProvider>
  );
}

// Component to conditionally render Login/Register or TodoApp
function AppContent({ showRegister, setShowRegister }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center">
        <div className="inline-flex items-center px-4 py-2 text-white">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center py-8 px-4 md:px-0">
        <div className="w-full max-w-md">
          {showRegister ? (
            <Register onSwitchToLogin={() => setShowRegister(false)} />
          ) : (
            <Login onSwitchToRegister={() => setShowRegister(true)} />
          )}
        </div>
      </div>
    );
  }

  return <TodoApp />;
}

export default App;
