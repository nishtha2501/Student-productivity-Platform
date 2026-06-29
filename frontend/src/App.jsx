import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";

function App() {
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks`
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask() {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      title: newTask,
      status: "Pending",
    };

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      await loadTasks();
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async function deleteTask(id) {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      await loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function updateStatus(id) {
    const task = tasks.find((task) => task._id === id);

    let newStatus;

    if (task.status === "Pending") {
      newStatus = "In Progress";
    } else if (task.status === "In Progress") {
      newStatus = "Completed";
    } else {
      newStatus = "Pending";
    }

    const updatedTask = {
      ...task,
      status: newStatus,
    };

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      await loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesStatus =
      filterStatus === "All" || task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const remainingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  function clearCompleted() {
    setTasks(tasks.filter((task) => task.status !== "Completed"));
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="stats">
          {remainingTasks > 0 ? (
            <h2>You have {remainingTasks} tasks remaining</h2>
          ) : (
            <h2>All tasks completed</h2>
          )}

          <div className="stat-card">
            <h3>📋 Total</h3>
            <p>{totalTasks}</p>
          </div>

          <div className="stat-card">
            <h3>🟡 Pending</h3>
            <p>{pendingTasks}</p>
          </div>

          <div className="stat-card">
            <h3>🔵 In Progress</h3>
            <p>{inProgressTasks}</p>
          </div>

          <div className="stat-card">
            <h3>🟢 Completed</h3>
            <p>{completedTasks}</p>
          </div>
        </div>

        <div className="hero">
          <h1>Student Productivity Platform</h1>
          <p>Stay organised. Stay focused. Achieve more.</p>
        </div>

        <h2>{newTask}</h2>

        <input
          type="text"
          placeholder="🔍 Search your tasks..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="filter-buttons">
          <button onClick={() => setFilterStatus("All")}>All</button>
          <button onClick={() => setFilterStatus("Pending")}>Pending</button>
          <button onClick={() => setFilterStatus("In Progress")}>
            In Progress
          </button>
          <button onClick={() => setFilterStatus("Completed")}>
            Completed
          </button>
          <button onClick={clearCompleted}>Clear Completed</button>
        </div>

        <div className="add-task">
          <input
            type="text"
            placeholder="✍️ Add a new task..."
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            id={task._id}
            title={task.title}
            status={task.status}
            onDelete={deleteTask}
            onStatusChange={updateStatus}
          />
        ))}
      </div>
    </>
  );
}

export default App;