import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-900 bg-opacity-30 shadow-md py-4 border-b border-blue-800">
      <div className="container max-w-5xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Task Manager</h1>
        
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-white hidden sm:inline-block">Welcome, {user.name}</span>
            <button 
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm shadow-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;