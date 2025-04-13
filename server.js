//server.js
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./task');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/task-mate'); // Simplified connect options

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.send(tasks);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).send();
      }
      res.send(task); // Or you can send a 204 No Content with no body
    } catch (error) {
      res.status(500).send(error);
    }
});

app.patch('/tasks/:id/status', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { completed: req.body.completed },
        { new: true, runValidators: true }
      );
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.get('/tasks/search', async (req, res) => {
    try {
        const { query } = req.query;
        const tasks = await Task.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).send(); // Task not found
      }
      res.send(task);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get('/tasks/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const tasks = await Task.find({ category: category });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));