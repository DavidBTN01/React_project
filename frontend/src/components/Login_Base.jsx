import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

export default function Login_Base({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="login-container">
      <div className="login-box w-full max-w-md p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Inicia sesión
        </h2>

        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="password-container" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? "O" : "X"}
            </button>
          </div>

          <button type="submit" className="login-button">
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
            <a
              href="/forgot-password"
              className="text-blue-400 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
