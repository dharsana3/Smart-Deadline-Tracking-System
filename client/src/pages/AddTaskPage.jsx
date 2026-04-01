import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import TaskForm from "../components/task/TaskForm";
import "../styles/taskForm.css";

function AddTaskPage() {

  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">

        <Sidebar />

        <div className="dashboard-content">

          {/* 🔥 HEADER */}
          <div className="page-header">
            <div className="header-left">
              <h2>Create New Task</h2>
            </div>

            <button 
              className="back-btn"
              onClick={() => navigate("/tasks")}
            >
              ← Back
            </button>
          </div>

          {/* 🔥 CENTERED FORM */}
          <div className="task-form-container">
            <div className="task-form-card">
              <TaskForm />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AddTaskPage;