import { useState } from "react";
import "../../styles/task.css";
import { markTaskCompleted, updateTask, deleteTask } from "../../services/taskService";

function TaskCard({ task, refresh }) {

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const isOverdue = () => {
    if (!task.dueDate) return false;

    const today = new Date();
    today.setHours(0,0,0,0);

    const due = new Date(task.dueDate);
    due.setHours(0,0,0,0);

    return task.status !== "COMPLETED" && due < today;
  };

  const getDisplayStatus = () => {
    if (task.status === "COMPLETED") return "COMPLETED";
    if (isOverdue()) return "OVERDUE";
    return "PENDING";
  };

  const handleComplete = async () => {
    try {
      await markTaskCompleted(task.taskId);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.taskId);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateTask(task.taskId, {
        ...task,
        title,
        dueDate: dueDate ? dueDate + "T00:00:00" : null
      });

      setIsEditing(false);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`task-card ${isOverdue() ? "overdue-card" : ""}`}>

      {isEditing ? (
        <div className="edit-mode">

          <input
            className="edit-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="edit-input"
            type="date"
            value={dueDate ? dueDate.substring(0, 10) : ""}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="task-buttons">
            <button className="primary-btn" onClick={handleUpdate}>Save</button>
            <button className="secondary-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-top">
            <span className={`priority-badge ${task.priority}`}>
              {task.priority}
            </span>
          </div>

          <h3>{task.title}</h3>

          <div className="task-meta">
            <span className={`status-badge ${getDisplayStatus()}`}>
              {getDisplayStatus()}
            </span>
          </div>

          <p className="due-date">
            📅 {task.dueDate ? task.dueDate.substring(0, 10) : "No due date"}
          </p>

          {isOverdue() && (
            <p className="overdue-text">⚠ This task is overdue</p>
          )}

          <div className="task-buttons">
            <button className="secondary-btn" onClick={() => setIsEditing(true)}>Edit</button>

            {task.status !== "COMPLETED" && (
              <button className="complete-btn" onClick={handleComplete}>
                Complete
              </button>
            )}

            <button className="danger-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}

    </div>
  );
}

export default TaskCard;