import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const pingBackend = async () => {
    const res = await fetch("http://localhost:4000/ping");
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager App</h1>
      <button onClick={pingBackend}>Ping Backend</button>
      {message && <p>Respuesta del backend: {message}</p>}
    </div>
  );
}

export default App;
