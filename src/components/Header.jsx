import { useAuth } from "../contexts";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-[#172842] shadow-md py-4 border-b border-[#374151]">
      <div className="container max-w-2xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Todo Manager</h1>
        
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-white">Welcome, {user.name}</span>
            <button 
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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