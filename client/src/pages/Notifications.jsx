import { useEffect, useState, useContext } from "react";
import { getTasksByUser } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import "../styles/layout.css";
import "../styles/notifications.css";

function Notifications() {

  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const res = await getTasksByUser(user.userId);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const filtered = res.data
        .filter(task => {
          const due = new Date(task.dueDate);
          due.setHours(0, 0, 0, 0);

          return (
            task.status !== "COMPLETED" &&
            (
              due < today || // 🔴 overdue
              due.getTime() === today.getTime() || // 🟡 today
              due.getTime() === tomorrow.getTime() // 🔵 tomorrow
            )
          );
        })
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // ✅ sort

      setNotifications(filtered);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">

        <Sidebar />

        <div className="dashboard-content">

          <h2>🔔 Notifications</h2>

          {notifications.length === 0 ? (
            <p className="empty-msg">No reminders for now 🎉</p>
          ) : (
            notifications.map(task => {

              const due = new Date(task.dueDate);
              due.setHours(0, 0, 0, 0);

              const today = new Date();
              today.setHours(0, 0, 0, 0);

              let label = "";
              let className = "";

              if (due < today) {
                label = "🔴 Overdue";
                className = "overdue";
              } else if (due.getTime() === today.getTime()) {
                label = "🟡 Due Today";
                className = "today";
              } else {
                label = "🔵 Due Tomorrow";
                className = "tomorrow";
              }

              return (
                <div key={task.taskId} className={`notification-card ${className}`}>
                  <h3>{task.title}</h3>
                  <p>Due: {task.dueDate.substring(0, 10)}</p>
                  <p className="warning">{label}</p>
                </div>
              );
            })
          )}

        </div>
      </div>
    </div>
  );
}

export default Notifications;