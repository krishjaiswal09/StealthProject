import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import { AuthProvider, useAuth } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";

// Main Todo App Component
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  // Load todos from localStorage on initial render
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // Update localStorage when todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen">
        <Header />
        <div className="py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-4">
              <TodoForm />
            </div>

            {/* Task Filter Component */}
            <TodoFilter filter={filter} setFilter={setFilter} />

            {/* Task Counter */}
            <div className="flex justify-between items-center mb-4 text-sm text-gray-300">
              <span>
                {filteredTodos.length}{" "}
                {filteredTodos.length === 1 ? "task" : "tasks"}{" "}
                {filter !== "all" ? `(${filter})` : ""}
              </span>
              <span>
                {todos.filter((todo) => !todo.completed).length} remaining
              </span>
            </div>

            <div className="flex flex-wrap gap-y-3">
              {filteredTodos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}

              {filteredTodos.length === 0 && (
                <div className="w-full text-center py-4 text-gray-400">
                  {filter === "all"
                    ? "No tasks yet. Add one above!"
                    : filter === "active"
                    ? "No active tasks"
                    : "No completed tasks"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

// App Wrapper with Authentication
function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AuthProvider>
      <AppContent
        showRegister={showRegister}
        setShowRegister={setShowRegister}
      />
    </AuthProvider>
  );
}

// Component to conditionally render Login/Register or TodoApp
function AppContent({ showRegister, setShowRegister }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="bg-[#172842] min-h-screen flex items-center justify-center py-8">
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
