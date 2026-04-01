import { useEffect, useState, useContext } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";

import { getTasksByUser } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import "../styles/Calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarPage() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await getTasksByUser(user.userId);

        const today = new Date();
        today.setHours(0,0,0,0);

        const formatted = res.data.map(task => {
          const due = new Date(task.dueDate);
          due.setHours(0,0,0,0);

          let color = "#2196f3";

          if (task.status === "COMPLETED") {
            color = "#4CAF50";
          } else if (due < today) {
            color = "#f44336";
          } else {
            color = "#ff9800";
          }

          return {
            title: task.title,
            start: due,
            end: due,
            color
          };
        });

        setEvents(formatted);

      } catch (error) {
        console.error(error);
      }
    };

    if (user) loadTasks();
  }, [user]);

  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">

        <Sidebar />

        <div className="dashboard-content">

          {/* 🔥 HEADER */}
          <div className="page-header">
            <div>
              <h2>📅 Task Calendar</h2>
            </div>
          </div>

          {/* 🔥 CALENDAR (NO BOX FEEL) */}
          <div className="calendar-wrapper">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"

              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color,
                  borderRadius: "6px",
                  color: "white",
                  border: "none"
                }
              })}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default CalendarPage;