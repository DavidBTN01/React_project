import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react"; // íconos
import ProductList from "../components/ProductList";
import WarehouseList from "../components/WarehouseList";
import StockList from "../components/StockList";
import MovementList from "../components/MovementList";
import Login from "../components/Login_Base";

export default function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform bg-white shadow-lg w-64 transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Menú</h2>
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <button className="text-left hover:bg-gray-200 rounded px-3 py-2">Productos</button>
          <button className="text-left hover:bg-gray-200 rounded px-3 py-2">Almacenes</button>
          <button className="text-left hover:bg-gray-200 rounded px-3 py-2">Stock</button>
          <button className="text-left hover:bg-gray-200 rounded px-3 py-2">Movimientos</button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 mt-4 text-red-600 hover:bg-red-100 rounded px-3 py-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow p-4">
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={28} />
          </button>
          <h1 className="text-xl font-semibold">Bienvenido {user.name}</h1>
        </header>

        {/* Main content */}
        <main className="p-6 overflow-y-auto">
          <ProductList />
          <WarehouseList />
          <StockList />
          <MovementList />
        </main>
      </div>
    </div>
  );
}
