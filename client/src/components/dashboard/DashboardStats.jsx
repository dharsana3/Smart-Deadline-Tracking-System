import "../../styles/task.css";

function DashboardStats({ tasks }) {

  const now = new Date();

  // ✅ Centralized status logic (BEST PRACTICE)
  const getStatus = (task) => {
    if (task.status === "COMPLETED") return "COMPLETED";

    if (task.dueDate && new Date(task.dueDate) < now) {
      return "OVERDUE";
    }

    return "PENDING";
  };

  const total = tasks.length;

  const completed = tasks.filter(
    (t) => getStatus(t) === "COMPLETED"
  ).length;

  const today = new Date();
today.setHours(0,0,0,0);

const overdue = tasks.filter(t => {
  const due = new Date(t.dueDate);
  due.setHours(0,0,0,0);

    return (
      t.status !== "COMPLETED" &&
      due < today
    );
  }).length;

  const pending = tasks.filter(
    (t) => getStatus(t) === "PENDING"
  ).length;

  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3>Total Tasks</h3>
        <p>{total}</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>

      <div className="stat-card">
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>

      <div className="stat-card">
        <h3>Overdue</h3>
        <p>{overdue}</p>
      </div>

    </div>
  );
}

export default DashboardStats;