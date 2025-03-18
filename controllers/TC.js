const Task = require('../models/Task');

// Fetch tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Adding new task
exports.addTask = async (req, res) => {
  const { title } = req.body;
  try {
    const newTask = new Task({ title });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Updating task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed, title } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, { completed, title }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Deleteing task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
