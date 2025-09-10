import { useEffect, useState } from "react";
import { api } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Cargar tareas al inicio
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      console.log("📦 Datos recibidos:", res.data);
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Error al traer tareas:", err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id, completed) => {
    await api.put(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📋 Lista de Tareas</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTask(task.id, task.completed)}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
