import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function StockList() {
  const [stock, setStock] = useState([]);
  const [form, setForm] = useState({ productId: "", warehouseId: "", quantity: 0 });

  const fetchStock = async () => {
    const res = await axios.get("/stock");
    setStock(res.data);
  };

  const handleUpdate = async () => {
    await axios.post("/stock", form);
    setForm({ productId: "", warehouseId: "", quantity: 0 });
    fetchStock();
  };

  useEffect(() => { fetchStock(); }, []);

  return (
    <div>
      <h2>Stock</h2>
      <input placeholder="Product ID" value={form.productId} onChange={e => setForm({...form, productId: e.target.value})} />
      <input placeholder="Warehouse ID" value={form.warehouseId} onChange={e => setForm({...form, warehouseId: e.target.value})} />
      <input type="number" placeholder="Cantidad" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
      <button onClick={handleUpdate}>Actualizar</button>
      <ul>
        {stock.map(s => <li key={s.id}>{s.Product?.name} - {s.Warehouse?.name} - {s.quantity}</li>)}
      </ul>
    </div>
  );
}
