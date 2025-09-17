import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function MovementList() {
  const [movements, setMovements] = useState([]);
  const [form, setForm] = useState({ type: "IN", productId: "", warehouseId: "", quantity: 0, reason: "" });

  const fetchMovements = async () => {
    const res = await axios.get("/movements");
    setMovements(res.data);
  };

  const handleAdd = async () => {
    await axios.post("/movements", form);
    setForm({ type: "IN", productId: "", warehouseId: "", quantity: 0, reason: "" });
    fetchMovements();
  };

  useEffect(() => { fetchMovements(); }, []);

  return (
    <div>
      <h2>Movimientos</h2>
      <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
        <option value="IN">IN</option>
        <option value="OUT">OUT</option>
        <option value="ADJUST">ADJUST</option>
      </select>
      <input placeholder="Product ID" value={form.productId} onChange={e => setForm({...form, productId: e.target.value})} />
      <input placeholder="Warehouse ID" value={form.warehouseId} onChange={e => setForm({...form, warehouseId: e.target.value})} />
      <input type="number" placeholder="Cantidad" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
      <input placeholder="Motivo" value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} />
      <button onClick={handleAdd}>Registrar Movimiento</button>

      <ul>
        {movements.map(m => <li key={m.id}>{m.type} - {m.Product?.name} - {m.Warehouse?.name} - {m.quantity}</li>)}
      </ul>
    </div>
  );
}
