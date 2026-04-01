import { useState, useContext } from "react";
import { createTask } from "../../services/taskService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TaskForm() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("LOW");

  const [errors, setErrors] = useState({});

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Minimum 3 characters required";
    }

    if (dueDate) {
      const today = new Date();
      today.setHours(0,0,0,0);

      const selected = new Date(dueDate);
      selected.setHours(0,0,0,0);

      if (selected < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await createTask({
        title: title.trim(),
        description,
        dueDate: dueDate ? dueDate + "T00:00:00" : null,
        priority,
        user: { userId: user.userId }
      });

      toast.success("Task created successfully 🎉");

      setTimeout(() => {
        navigate("/tasks");
      }, 1000);

    } catch (error) {
      toast.error("Failed to create task ❌");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      {/* 🔥 BASIC INFO */}
      <div className="form-section">
        <h4>Basic Information</h4>

        <div className={`input-group ${errors.title ? "error-input" : ""}`}>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);

              // 🔥 realtime error clear
              if (errors.title) {
                setErrors({ ...errors, title: "" });
              }
            }}
          />
        </div>
        {errors.title && <p className="error-text">{errors.title}</p>}

        <br />
        <div className="input-group">
          <textarea
            placeholder="Enter task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {/* 🔥 SCHEDULE */}
      <div className="form-section">
        <h4>Schedule</h4>

        <div className={`input-group ${errors.dueDate ? "error-input" : ""}`}>
          <span>📅</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);

              if (errors.dueDate) {
                setErrors({ ...errors, dueDate: "" });
              }
            }}
          />
        </div>
        {errors.dueDate && <p className="error-text">{errors.dueDate}</p>}
      </div>

      {/* 🔥 PRIORITY */}
      <div className="form-section">
        <h4>Priority</h4>

        <div className="priority-buttons">
          {["LOW", "MEDIUM", "HIGH"].map((p) => (
            <button
              type="button"
              key={p}
              className={priority === p ? "active" : ""}
              onClick={() => setPriority(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 SUBMIT */}
      <button type="submit" className="primary-btn submit-btn">
        + Create Task
      </button>

    </form>
  );
}

export default TaskForm;