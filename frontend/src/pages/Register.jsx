import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { name, email, password });
      setSuccess("Usuario registrado correctamente!");
      setError("");
      setTimeout(() => navigate("/login"), 1500); // redirige al login
    } catch (err) {
      setError(err.response?.data?.error || "Error en registro");
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box w-full max-w-md p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Registro
        </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="register-input"
          />
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-input"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="register-input"
            />
          </div>
          <button type="submit" className="register-button">
            Registrar
          </button>
        </form>

        <div className="text-center mt-6 space-y-2 text-sm text-gray-400">
          <p>
            <a href="/login" className="text-blue-400 hover:underline">
              Ya tienes una cuenta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
