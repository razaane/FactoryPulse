
import { useState } from "react";
import MachineCard from "../components/MachineCard";
import "./Machines.css";

function Machines({ machines, onStatusChange, onDelete }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous les statuts");

  const filteredMachines = machines.filter((machine) => {
    const matchesName = machine.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "Tous les statuts" ||
      machine.status === statusFilter;

    return matchesName && matchesStatus;
  });

  const handleReset = () => {
    setSearch("");
    setStatusFilter("Tous les statuts");
  };

  return (
    <div className="machines-page">
      <div className="machines-toolbar">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Rechercher par nom ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>Tous les statuts</option>
          <option>En fonctionnement</option>
          <option>En panne</option>
          <option>À l'arrêt</option>
        </select>

        <button className="reset-button" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>

      <div className="machines-grid">
        {filteredMachines.length > 0 ? (
          filteredMachines.map((machine) => (
            <MachineCard
              key={machine.id}
              machine={machine}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p>Aucune machine trouvée.</p>
        )}
      </div>
    </div>
  );
}

export default Machines;
