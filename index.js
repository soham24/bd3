const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

app.use(cors());
app.use(express.json());

// Endpoint 1: Add a Task
app.get('/tasks/add', (req, res) => {
  const { taskId, text, priority } = req.query;
  tasks.push({ taskId: parseInt(taskId), text, priority: parseInt(priority) });
  res.json({ tasks });
});

// Endpoint 2: Read All Tasks
app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

// Endpoint 3: Sort Tasks by Priority
app.get('/tasks/sort-by-priority', (req, res) => {
  const sortedTasks = tasks.sort((a, b) => a.priority - b.priority);
  res.json({ tasks: sortedTasks });
});

// Endpoint 4: Edit Task Priority
app.get('/tasks/edit-priority', (req, res) => {
  const { taskId, priority } = req.query;
  const task = tasks.find((t) => t.taskId === parseInt(taskId));
  if (task) {
    task.priority = parseInt(priority);
  }
  res.json({ tasks });
});

// Endpoint 5: Edit Task Text
app.get('/tasks/edit-text', (req, res) => {
  const { taskId, text } = req.query;
  const task = tasks.find((t) => t.taskId === parseInt(taskId));
  if (task) {
    task.text = text;
  }
  res.json({ tasks });
});

// Endpoint 6: Delete a Task
app.get('/tasks/delete', (req, res) => {
  const { taskId } = req.query;
  tasks = tasks.filter((t) => t.taskId !== parseInt(taskId));
  res.json({ tasks });
});

// Endpoint 7: Filter Tasks by Priority
app.get('/tasks/filter-by-priority', (req, res) => {
  const { priority } = req.query;
  const filteredTasks = tasks.filter((t) => t.priority === parseInt(priority));
  res.json({ tasks: filteredTasks });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
