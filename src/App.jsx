
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMachines = async () => {
      try {
        const response = await fetch("/machines.json");

        if (!response.ok) {
          throw new Error("Impossible de charger les machines");
        }

        const data = await response.json();
        setMachines(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMachines();
  }, []);

  if (loading) {
    return <p>Chargement des machines...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>FactoryPulse</h1>
                  <p>Nombre de machines : {machines.length}</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
