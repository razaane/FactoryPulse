
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
import AddMachine from "./pages/AddMachine";

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


  const handleStatusChange = (id, newStatus) => {
    setMachines((previousMachines) =>
      previousMachines.map((machine) =>
        machine.id === id
          ? { ...machine, status: newStatus }
          : machine
      )
    );
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Voulez-vous supprimer cette machine ?");

    if (confirmed) {
      setMachines((previousMachines) =>
        previousMachines.filter((machine) => machine.id !== id)
      );
    }
  };



const handleAddMachine = (newMachine) => {
  setMachines((previousMachines) => {
    const newId =
      Math.max(0, ...previousMachines.map((machine) => machine.id)) + 1;

    return [
      ...previousMachines,
      { ...newMachine, id: newId },
    ];
  });
};

  return (
    <BrowserRouter>
      <div className="app-layout">
        
        <Sidebar />

        <main className="main-content">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Dashboard machines={machines}/>}
            />
            <Route
              path="/machines"
              element ={
                <Machines machines={machines}
                onStatusChange={handleStatusChange} onDelete={handleDelete}/>
              }
            />
            <Route
              path="/machines/add"
              element={<AddMachine onAddMachine={handleAddMachine} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
