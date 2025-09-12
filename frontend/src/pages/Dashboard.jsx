import { useState } from "react";
import ProductList from "../components/ProductList";
import WarehouseList from "../components/WarehouseList";
import StockList from "../components/StockList";
import MovementList from "../components/MovementList";
import Login from "../components/Login";

export default function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div>
      <header>
        <h1>Bienvenido {user.name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <ProductList />
        <WarehouseList />
        <StockList />
        <MovementList />
      </main>
    </div>
  );
}
