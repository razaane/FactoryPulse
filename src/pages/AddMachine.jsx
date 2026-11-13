
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddMachine.css";

function AddMachine({ onAddMachine }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [status, setStatus] = useState("En fonctionnement");
  const [production, setProduction] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMachine = {
      name: name.trim(),
      zone: zone.trim(),
      status,
      production: Number(production),
    };

    onAddMachine(newMachine);
    navigate("/machines");
  };

  return (
    <div className="add-machine-page">
      <form className="add-machine-form" onSubmit={handleSubmit}>
        <h2>Ajouter une machine</h2>

        <div className="form-group">
          <label>Nom de machine</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Zone de production</label>
          <input
            type="text"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>En fonctionnement</option>
            <option>À l'arrêt</option>
            <option>En panne</option>
          </select>
        </div>

        <div className="form-group">
          <label>Production journalière (pieces)</label>
          <input
            type="number"
            min="0"
            step="1"
            value={production}
            onChange={(e) => setProduction(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="save-machine-button">
          Save machine
        </button>
      </form>
    </div>
  );
}

export default AddMachine;
