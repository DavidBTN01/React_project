import { useEffect, useState } from "react";
import {axios} from "../api/axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", sku: "", price: "" });

  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  const handleAdd = async () => {
    await axios.post("/products", form);
    setForm({ name: "", sku: "", price: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div>
      <h2>Productos</h2>
      <input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="SKU" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
      <input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
      <button onClick={handleAdd}>Agregar</button>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - {p.sku} - ${p.price}
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
