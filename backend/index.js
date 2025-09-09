const express = require("express");
const cors = require("cors");
const sequelize = require("./models");
const Task = require("./models/Task");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Sincronizar base de datos
sequelize
  .sync({ alter: true }) // 👈 mejor que force:true, actualiza sin borrar
  .then(() => console.log("Database synced with PostgreSQL"))
  .catch((err) => console.error("DB connection error:", err));

// 🔹 Endpoint de prueba
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// 🔹 Endpoints CRUD
app.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description });
  res.status(201).json(task);
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  await task.update({ title, description, completed });
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  await task.destroy();
  res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
