import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskFilter from "./TaskFilter";

function TaskList({ tasks = [], refresh }) {

  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const finalTasks = tasks
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(task => {

      if (filter === "COMPLETED") {
        return task.status === "COMPLETED";
      }

      if (filter === "PENDING") {
        return task.status === "PENDING";
      }

      if (filter === "OVERDUE") {
        if (!task.dueDate) return false;

        const dueDate = new Date(task.dueDate);
        const today = new Date();
        dueDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return task.status !== "COMPLETED" && dueDate < today;
      }

      return true;
    });

  return (
    <div>

      <TaskFilter 
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      {/* 🔥 EMPTY STATE */}
      {finalTasks.length === 0 ? (
        <div className="no-task">
          <h3>No tasks found</h3>
          <p>Try changing filter or add a new task</p>
        </div>
      ) : (
        finalTasks.map(task => (
          <TaskCard
            key={task.taskId}
            task={task}
            refresh={refresh}
          />
        ))
      )}

    </div>
  );
}

export default TaskList;