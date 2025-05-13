import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const { updateTodo, deleteTodo, toggleComplete, loading } = useTodo();

  const editTodo = async () => {
    const success = await updateTodo(todo._id, { 
      ...todo, 
      title, 
      description 
    });
    
    if (success) {
      setIsTodoEditable(false);
    }
  };

  const toggleCompleted = () => {
    toggleComplete(todo._id);
  };

  const handleDelete = () => {
    deleteTodo(todo._id);
  };

  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'High': return 'bg-red-50 border-l-4 border-red-500';
      case 'Medium': return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'Low': return 'bg-green-50 border-l-4 border-green-500';
      default: return 'bg-gray-50 border-l-4 border-gray-500';
    }
  };

  const getPriorityBadgeColor = () => {
    switch (todo.priority) {
      case 'High': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div
      className={`rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300 ${
        todo.completed ? "bg-gray-100 border-l-4 border-gray-400" : getPriorityColor()
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-x-3 flex-1">
          <input
            type="checkbox"
            className="cursor-pointer w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={todo.completed}
            onChange={toggleCompleted}
            disabled={loading}
          />
          {isTodoEditable ? (
            <input
              type="text"
              className="border border-gray-300 px-3 py-2 outline-none bg-white rounded-md w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h3 className={`text-lg font-medium ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
              {todo.title}
            </h3>
          )}
        </div>
        <div className="flex gap-x-2 items-center">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPriorityBadgeColor()}`}>
            {todo.priority}
          </span>
          {/* Edit, Save Button */}
          <button
            className="inline-flex w-8 h-8 rounded-full text-sm border border-gray-300 justify-center items-center bg-white hover:bg-gray-50 shrink-0 disabled:opacity-50 transition-colors"
            onClick={() => {
              if (todo.completed) return;

              if (isTodoEditable) {
                editTodo();
              } else setIsTodoEditable((prev) => !prev);
            }}
            disabled={todo.completed || loading}
            title={isTodoEditable ? "Save" : "Edit"}
          >
            {isTodoEditable ? "💾" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
            className="inline-flex w-8 h-8 rounded-full text-sm border border-gray-300 justify-center items-center bg-white hover:bg-gray-50 shrink-0 transition-colors hover:text-red-500"
            onClick={handleDelete}
            disabled={loading}
            title="Delete"
          >
            ❌
          </button>
        </div>
      </div>
      
      {/* Description */}
      <div className="pl-8">
        {isTodoEditable ? (
          <textarea
            className="w-full border border-gray-300 px-3 py-2 outline-none bg-white rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
          />
        ) : (
          <p className={`text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-600"}`}>
            {todo.description}
          </p>
        )}
        
        {/* Created date */}
        <p className="text-xs text-gray-500 mt-2 italic">
          Created: {new Date(todo.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default TodoItem;
