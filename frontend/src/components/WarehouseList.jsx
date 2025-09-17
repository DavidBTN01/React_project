import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function WarehouseList() {
  const [warehouses, setWarehouses] = useState([]);
  const [form, setForm] = useState({ name: "", location: "" });

  const fetchWarehouses = async () => {
    const res = await axios.get("/warehouses");
    setWarehouses(res.data);
  };

  const handleAdd = async () => {
    await axios.post("/warehouses", form);
    setForm({ name: "", location: "" });
    fetchWarehouses();
  };

  useEffect(() => { fetchWarehouses(); }, []);

  return (
    <div>
      <h2>Almacenes</h2>
      <input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Ubicación" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
      <button onClick={handleAdd}>Agregar</button>
      <ul>
        {warehouses.map(w => <li key={w.id}>{w.name} - {w.location}</li>)}
      </ul>
    </div>
  );
}
