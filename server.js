const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // npm install uuid

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const tasksFile = path.join(__dirname, "tasks.json");

// Helper: Read tasks
function readTasks() {
  try {
    const data = fs.readFileSync(tasksFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper: Write tasks
function writeTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// GET all tasks
app.get("/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// POST new task
app.post("/tasks", (req, res) => {
  const tasks = readTasks();
  const newTaskText = req.body.task?.trim();

  if (!newTaskText) return res.status(400).json({ message: "Task required" });

  const newTask = { id: uuidv4(), task: newTaskText };
  tasks.push(newTask);
  writeTasks(tasks);
  res.json(tasks);
});

// PUT update task by ID
app.put("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const { id } = req.params;
  const updatedText = req.body.task?.trim();

  if (!updatedText) return res.status(400).json({ message: "Task required" });

  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) return res.status(400).json({ message: "Task not found" });

  tasks[taskIndex].task = updatedText;
  writeTasks(tasks);
  res.json(tasks);
});

// DELETE task by ID
app.delete("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const { id } = req.params;

  const newTasks = tasks.filter(t => t.id !== id);
  if (newTasks.length === tasks.length)
    return res.status(400).json({ message: "Task not found" });

  writeTasks(newTasks);
  res.json(newTasks);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
