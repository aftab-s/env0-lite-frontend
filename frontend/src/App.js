import React, { useState } from "react";
import axios from "axios";

function App() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const triggerPlan = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/terraform/plan", {}, {
        headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhN2Y1OTNlLTRmZDItNDdjMS1hZDY5LTUxOGQwYmU1Njc5OSIsInVzZXJuYW1lIjoiTWFzdGVyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU3NDg1MjI2fQ.3jSzMECrUrRHx7li9vfQJS8dAkMrg7oC8bZ0yct5bls" }
      });
      setOutput(res.data.message || JSON.stringify(res.data));
    } catch (e) {
      setOutput("Error: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Terraform Plan Runner</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={triggerPlan}
          disabled={loading}
        >
          {loading ? "Running..." : "Run Plan"}
        </button>
        <pre className="mt-4 bg-gray-200 p-4 rounded text-sm overflow-x-auto">{output}</pre>
      </div>
    </div>
  );
}

export default App;
