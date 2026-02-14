const express = require('express');

const router = express.Router();

// In-memory store
let users = [];
let nextId = 1;

// GET /api/users - Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST /api/users - Create new user
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const user = { id: nextId++, name, email, createdAt: new Date().toISOString() };
  users.push(user);
  res.status(201).json(user);
});

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send();
});

// Reset users (for testing)
function resetUsers() {
  users = [];
  nextId = 1;
}

module.exports = router;
module.exports.resetUsers = resetUsers;
