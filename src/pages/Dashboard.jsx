import "./Dashboard.css";

function Dashboard({machines}) {
    const totalMachines = machines.length;
    const runningMachines = machines.filter((machines)=>
        machines.status ==="En fonctionnement").length;
    const brokenMachines = machines.filter((machines)=>
    machines.status ==="En panne").length;
  
    return (
      <div className="dashboard">
          
          <div className="stats-grid">
            <div className="stat-card total">
                <h3>Total machines</h3>
                <p>{totalMachines}</p>
            </div>

             <div className="stat-card running">
                <h3>En fonctionnement</h3>
                <p>{runningMachines}</p>
            </div>

             <div className="stat-card broken">
                <h3>En panne</h3>
                <p>{brokenMachines}</p>
            </div>
          </div>
      </div>

    )
}

export default Dashboard;