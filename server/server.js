const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple MongoDB connection - get string from mongodb.com
mongoose.connect('mongodb+srv://dp_db_user:g5UbJ35nGRzipxCL@cluster0.cr2k7qy.mongodb.net/?appName=Cluster0/bugtracker')
  .then(() => console.log('MongoDB connected'));

// Simple Schema
const Bug = mongoose.model('Bug', new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  status: { type: String, default: 'Open' }
}));

// API Routes
app.get('/api/bugs', async (req, res) => res.json(await Bug.find()));
app.post('/api/bugs', async (req, res) => res.json(await Bug.create(req.body)));
app.put('/api/bugs/:id', async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  bug.status = req.body.status;
  res.json(await bug.save());
});
app.delete('/api/bugs/:id', async (req, res) => {
  await Bug.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

app.listen(5000, () => console.log('Server on port 5000'));