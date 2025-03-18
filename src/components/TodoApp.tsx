import React, { useState, useEffect } from "react";
import api from "@/services/api"; // ✅ Updated import
import styles from "@/styles/TodoApp.module.css";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Fetch tasks from backend
  useEffect(() => {
    api.get("/tasks") // 🔄 Changed from `/` to `/tasks`
      .then((res) => {
        console.log("📥 API response:", res.data); // Debugging
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          console.error("⚠️ Unexpected response format:", res.data);
          setTasks([]);
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching tasks:", err);
        setTasks([]); // Handle errors
      });
  }, []);

  // ✅ Add task
  const addTask = () => {
    if (newTask.trim() === "") return;

    api.post("/tasks", { title: newTask })
      .then((res) => {
        console.log("✅ Task added:", res.data);
        setTasks([...tasks, res.data]); // Update UI with new task
        setNewTask("");
      })
      .catch((err) => console.error("❌ Error adding task:", err));
  };

  // ✅ Toggle completion
  const toggleTask = (id: string, completed: boolean) => {
    api.put(`/tasks/${id}`, { completed: !completed })
      .then((res) => {
        console.log("🔄 Task updated:", res.data);
        setTasks(tasks.map(task => (task._id === id ? res.data : task)));
      })
      .catch((err) => console.error("❌ Error updating task:", err));
  };

  // ✅ Delete task
  const deleteTask = (id: string) => {
    api.delete(`/tasks/${id}`)
      .then(() => {
        console.log("🗑️ Task deleted:", id);
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch((err) => console.error("❌ Error deleting task:", err));
  };

  // ✅ Start editing
  const startEditing = (id: string, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  // ✅ Update task title
  const updateTask = () => {
    if (!editingId || editText.trim() === "") return;

    api.put(`/tasks/${editingId}`, { title: editText })
      .then((res) => {
        console.log("✏️ Task updated:", res.data);
        setTasks(tasks.map(task => (task._id === editingId ? res.data : task)));
        setEditingId(null);
        setEditText("");
      })
      .catch((err) => console.error("❌ Error updating task:", err));
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <header className={styles.header}>
        <h1>Richard Todo App</h1>
        <button className={styles.toggleBtn} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <div className={styles.inputSection}>
        <input
          type="text"
          className={styles.inputField}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className={styles.addButton} onClick={addTask}>Add</button>
      </div>

      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? styles.completed : ""}>
            {editingId === task._id ? (
              <>
                <input
                  type="text"
                  className={styles.inputField}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className={styles.addButton} onClick={updateTask}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTask(task._id, task.completed)}>
                  {task.title}
                </span>
                <button className={styles.addButton} onClick={() => startEditing(task._id, task.title)}>Edit</button>
                <button className={styles.addButton} onClick={() => deleteTask(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
