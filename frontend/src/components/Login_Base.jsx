import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login_Base({ onLogin }) {
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
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-6">
        

        <h2 className="text-2xl font-bold mb-6 text-center">Inicia sesión</h2>

        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: "0.5rem 1rem", marginRight: "1rem" }}
          >
            Login
          </button>
        </form>

        {/* Links extras */}
        <div className="text-center mt-6 space-y-2 text-sm text-gray-400">
          <p>
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Regístrate
            </a>
          </p>
          <p>
            <a href="/forgot-password" className="hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
