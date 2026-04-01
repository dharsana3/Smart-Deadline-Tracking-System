import { useEffect, useState, useContext } from "react";
import { getTasksByUser } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer
} from "recharts";

import "../styles/layout.css";
import "../styles/profile.css";


function Profile() {

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

  // 📊 Performance calculation
  let onTime = 0;
let late = 0;
let pending = 0;

const now = new Date();

tasks.forEach(task => {
  const dueDate = new Date(task.dueDate);

  if (task.status === "COMPLETED") {
    const completedDate = new Date(task.updatedAt);

    if (completedDate <= dueDate) {
      onTime++;
    } else {
      late++;
    }
  } else {
    // ✅ NEW LOGIC
    if (dueDate < now) {
      late++; // overdue task
    } else {
      pending++;
    }
  }
});

  const data = [
    { name: "On Time", value: onTime },
    { name: "Late", value: late },
    { name: "Pending", value: pending }
  ];

  const COLORS = ["#4CAF50", "#f44336", "#ff9800"];

  // 📅 Group tasks week-wise
  const getWeeklyData = () => {
  const weeks = {};
  const now = new Date();

  tasks.forEach(task => {
    const dueDate = new Date(task.dueDate);

    // Use dueDate for grouping (important for pending tasks)
    const baseDate = new Date(task.updatedAt || task.dueDate);

    const firstDay = new Date(baseDate.getFullYear(), 0, 1);
    const days = Math.floor((baseDate - firstDay) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + firstDay.getDay() + 1) / 7);

    const key = `Week ${weekNumber}`;

    if (!weeks[key]) {
      weeks[key] = { 
        week: key, 
        weekNum: weekNumber, 
        onTime: 0, 
        late: 0,
        pending: 0
      };
    }

    if (task.status === "COMPLETED") {
      const completedDate = new Date(task.updatedAt);

      if (completedDate <= dueDate) {
        weeks[key].onTime++;
      } else {
        weeks[key].late++;
      }
    } else {
      if (dueDate < now) {
        weeks[key].late++; // overdue
      } else {
        weeks[key].pending++; // ✅ now included
      }
    }
  });

  const sortedWeeks = Object.values(weeks).sort((a, b) => a.weekNum - b.weekNum);

  return sortedWeeks.slice(-4); // ✅ last 4 weeks only
};

  const weeklyData = getWeeklyData();

  const currentWeek = weeklyData[weeklyData.length - 1];
const prevWeek = weeklyData[weeklyData.length - 2];

const getTrend = (current, prev) => {
  if (!prev) return "no-data";

  if (current > prev) return "up";
  if (current < prev) return "down";
  return "same";
};

// Compare based on onTime performance (you can change this later)
const trend = getTrend(
  currentWeek?.onTime || 0,
  prevWeek?.onTime || 0
);
  const totalTasks = tasks.length;

const onTimePercent = totalTasks
  ? Math.round((onTime / totalTasks) * 100)
  : 0;

const latePercent = totalTasks
  ? Math.round((late / totalTasks) * 100)
  : 0;
  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">

        <Sidebar />

        <div className="dashboard-content">

            <div className="profile-header">

              <div className="profile-avatar">
                {user.username?.charAt(0).toUpperCase()}
              </div>

              <div className="profile-details">
                <h2>{user.username}</h2>
                <p>{user.email}</p>

                <div className="profile-meta">
                  <span> {tasks.length} Tasks</span>
                  <span> {onTimePercent}% On-Time</span>
                </div>
              </div>

            </div>
            <div className="trend-card">
              <h3>📈 Weekly Trend</h3>

              {trend === "up" && <p className="trend up">⬆️ Improved from last week</p>}
              {trend === "down" && <p className="trend down">⬇️ Declined from last week</p>}
              {trend === "same" && <p className="trend same">➖ No change</p>}
              {trend === "no-data" && <p>No previous data</p>}
            </div>

            <div className="profile-stats">

              <div className="stat-box success">
                <div className="stat-header">
                  <h4>On-Time Rate</h4>
                  <span>Performance</span>
                </div>
                <p className="percent">{onTimePercent}%</p>
                <div className="progress-bar">
                  <div 
                    className="progress success" 
                    style={{ width: `${onTimePercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="stat-box danger">
                <div className="stat-header">
                  <h4>Late Rate</h4>
                  <span>Delays</span>
                </div>
                <p className="percent">{latePercent}%</p>
                <div className="progress-bar">
                  <div 
                    className="progress danger" 
                    style={{ width: `${latePercent}%` }}
                  ></div>
                </div>
              </div>

            </div>
            <div className="charts-container">

              {/* 📊 Pie Chart Card */}
              <div className="chart-card">
                <h3>📊 Task Performance</h3>

                <PieChart width={300} height={260}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1e1e1e", border: "none", color: "#fff" }} 
                  />
                  <Legend />
                </PieChart>
              </div>

              {/* 📅 Bar Chart Card */}
              <div className="chart-card">
                <h3>📅 Weekly Performance</h3>

                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1e1e1e",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff"
                      }}
                      cursor={{ fill: "rgba(255,255,255,0.05)" }} // 👈 subtle hover instead of ugly block
                    />
                    <Legend />

                    <Bar dataKey="onTime" fill="#4CAF50" radius={[6,6,0,0]} />
                    <Bar dataKey="late" fill="#f44336" radius={[6,6,0,0]} />
                    <Bar dataKey="pending" fill="#ff9800" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;