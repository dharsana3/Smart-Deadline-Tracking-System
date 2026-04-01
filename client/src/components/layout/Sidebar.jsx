import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getTasksByUser } from "../../services/taskService";

import {
  FaHome,
  FaTasks,
  FaPlus,
  FaCalendar,
  FaBell,
  FaUser,
  FaBars,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

  const { user, logout } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await getTasksByUser(user.userId);
        const now = new Date();

        const notifications = res.data.filter(task => {
          const due = new Date(task.dueDate);
          return (
            task.status !== "COMPLETED" &&
            (due < now || due.toDateString() === now.toDateString())
          );
        });

        setCount(notifications.length);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) loadNotifications();
  }, [user]);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* Toggle */}
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        <FaBars />
      </button>

      {/* Menu */}
      <nav>

        <NavLink to="/dashboard" className="nav-item" title="Dashboard">
          <FaHome />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/tasks" className="nav-item" title="Tasks">
          <FaTasks />
          {!collapsed && <span>Tasks</span>}
        </NavLink>

        <NavLink to="/add-task" className="nav-item" title="Add Task">
          <FaPlus />
          {!collapsed && <span>Add Task</span>}
        </NavLink>

        <NavLink to="/calendar" className="nav-item" title="Calendar">
          <FaCalendar />
          {!collapsed && <span>Calendar</span>}
        </NavLink>

        <NavLink to="/notifications" className="nav-item notification" title="Notifications">
          <FaBell />
          {!collapsed && <span>Notifications</span>}
          {count > 0 && <span className="badge">{count}</span>}
        </NavLink>

        <NavLink to="/profile" className="nav-item" title="Profile">
          <FaUser />
          {!collapsed && <span>Profile</span>}
        </NavLink>

      </nav>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout} title="Logout">
        {collapsed ? <FaSignOutAlt /> : "Logout"}
      </button>

    </div>
  );
}

export default Sidebar;