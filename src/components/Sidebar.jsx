import { NavLink } from "react-router-dom";
import "./Sidebar.css";
function Sidebar(){
    return (
        <aside className="sidebar">
            <img src="/logo.png" alt="FactoryPluse"/>
            <hr/>

            <nav>
                <NavLink to="/">Dashboard </NavLink>
                <NavLink to="/machines">Machines</NavLink>
                <NavLink to="/machines/add">Add Machine</NavLink>
            </nav>
            
            <div className="sidebar-user">
                <div className="user-avatar">RW</div>
            
                <div>
                    
                    <p>Wakhidi Razane</p>
                    <span>Production Responsable</span>
                </div>
            </div>
            
            <button className="logout-button">
                Logout
            </button>


        </aside>

        
    );
}
export default Sidebar ;