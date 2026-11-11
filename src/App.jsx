import { useState, useEffect } from "react";

function App() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/machines.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de charger les machines");
        }

        return response.json();
      })
      .then((data) => {
        setMachines(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement des machines...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>FactoryPulse</h1>
      <p>Nombre de machines : {machines.length}</p>
    </div>
  );
}

export default App;