import React from "react";

function TodoFilter({ filter, setFilter }) {
  return (
    <div className="bg-white rounded-lg p-1 shadow-sm mb-6 flex justify-center">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
            filter === "all"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-t border-b ${
            filter === "active"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
            filter === "completed"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default TodoFilter;