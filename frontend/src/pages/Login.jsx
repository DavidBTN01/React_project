import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Login_Base from "../components/Login_Base";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      // Guardar token y usuario
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard"); // 🔹 Redirige al dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Error en login");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <main className="p-6 overflow-y-auto">
                <Login_Base />
              
              </main>
    </div>
  );
}
