import React from "react";

function TodoFilter({ filter, setFilter }) {
  return (
    <div className="flex justify-center items-center gap-4 mb-5 bg-gray-700 p-3 rounded-lg">
      <button
        className={`px-3 py-1 rounded-md transition-colors ${
          filter === "all" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`px-3 py-1 rounded-md transition-colors ${
          filter === "active" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
        }`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={`px-3 py-1 rounded-md transition-colors ${
          filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;