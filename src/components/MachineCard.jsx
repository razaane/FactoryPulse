
function MachineCard({ machine, onStatusChange, onDelete }) {
  const statusClass =
    machine.status === "En fonctionnement"
      ? "running"
      : machine.status === "En panne"
      ? "broken"
      : "stopped";

  return (
    <div className="machine-card">
      <div className="machine-card-top">
        <div>
          <h2>{machine.name}</h2>
        </div>

        <span className={`machine-status ${statusClass}`}>
          {machine.status}
        </span>
      </div>

      <p className="machine-zone">{machine.zone} - de Safi</p>

      <p className="machine-production">
        {machine.production}
        <span> pièces aujourd’hui</span>
      </p>

      <div className="machine-card-actions">
        <select
          value={machine.status}
          onChange={(e) =>
            onStatusChange(machine.id, e.target.value)
          }
          aria-label={`Modifier le statut de ${machine.name}`}
        >
          <option value="En fonctionnement">En fonctionnement</option>
          <option value="À l'arrêt">À l'arrêt</option>
          <option value="En panne">En panne</option>
        </select>

        <button
          className="delete-button"
          onClick={() => onDelete(machine.id)}
          aria-label={`Supprimer ${machine.name}`}
        >
          <img src="/images/trash.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default MachineCard;
