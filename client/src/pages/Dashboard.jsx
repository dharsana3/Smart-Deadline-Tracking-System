import { useEffect, useState, useContext } from "react";
import { getTasksByUser } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardStats from "../components/dashboard/DashboardStats";
import { useNavigate } from "react-router-dom";
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle } from "react-icons/fa";

import "../styles/dashboard.css";

function Dashboard() {

  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await getTasksByUser(user.userId);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const completedCount = tasks.filter(t => t.status === "COMPLETED").length;

  const now = new Date();

  const overdueCount = tasks.filter(t =>
    t.status !== "COMPLETED" && new Date(t.dueDate) < now
  ).length;

  const pendingCount = tasks.length - completedCount - overdueCount;

  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">

        <Sidebar />

        <div className="dashboard-content">

          {/* Header */}
          <div className="dashboard-header">
            <h2>Dashboard</h2>
            <br/>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">

            <div className="stat-card total">
              <FaTasks className="stat-icon" />
              <h3>Total Tasks</h3>
              <p>{tasks.length}</p>
            </div>

            <div className="stat-card completed">
              <FaCheckCircle className="stat-icon" />
              <h3>Completed</h3>
              <p>{completedCount}</p>
            </div>

            <div className="stat-card pending">
              <FaClock className="stat-icon" />
              <h3>Pending</h3>
              <p>{pendingCount}</p>
            </div>

            <div className="stat-card overdue">
              <FaExclamationTriangle className="stat-icon" />
              <h3>Overdue</h3>
              <p>{overdueCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;