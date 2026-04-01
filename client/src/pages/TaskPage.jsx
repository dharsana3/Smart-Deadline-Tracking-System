import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import TaskList from "../components/task/TaskList";
import { getTasksByUser } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";
import "../styles/layout.css";
import "../styles/task.css"; // ✅ make sure this is imported

function TaskPage() {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      const res = await getTasksByUser(user.userId);
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">

        <Sidebar />

        <div className="dashboard-content">

          {/* 🔥 IMPROVED HEADER */}
          <div className="task-header">
            <div>
              <h2>Your Tasks</h2>
            </div>

          </div>

          {/* Task List */}
          <TaskList tasks={tasks} refresh={loadTasks} />

        </div>

      </div>

    </div>
  );
}

export default TaskPage;