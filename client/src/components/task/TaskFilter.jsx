import "../../styles/task.css";

function TaskFilter({ search, setSearch, filter, setFilter }) {

  return (

    <div className="task-controls">

      {/* 🔍 Search */}
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <span 
            className="clear-btn"
            onClick={() => setSearch("")}
          >
            ✖
          </span>
        )}
      </div>

      {/* 🎯 Filters */}
      <div className="filter-buttons">
        {["ALL", "COMPLETED", "PENDING", "OVERDUE"].map((type) => (
          <button
            key={type}
            className={filter === type ? "active" : ""}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

    </div>
  );
}

export default TaskFilter;