import { Router } from "express";
import { AppError } from "../middleware/errorHandler.js";
import {
  validate,
  createUserRules,
  updateUserRules,
  idParamRule,
} from "../middleware/validator.js";

const router = Router();

// In-memory data store
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", createdAt: new Date().toISOString() },
  { id: 2, name: "Jane Smith", email: "jane@example.com", createdAt: new Date().toISOString() },
];
let nextId = 3;

// GET /api/users — list all users
router.get("/", (_req, res) => {
  res.json({
    status: "success",
    results: users.length,
    data: users,
  });
});

// GET /api/users/:id — get single user
router.get("/:id", idParamRule, validate, (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    throw new AppError("User not found", 404);
  }
  res.json({ status: "success", data: user });
});

// POST /api/users — create user
router.post("/", createUserRules, validate, (req, res) => {
  const { name, email } = req.body;

  const exists = users.some((u) => u.email === email);
  if (exists) {
    throw new AppError("Email already in use", 409);
  }

  const user = {
    id: nextId++,
    name,
    email,
    createdAt: new Date().toISOString(),
  };
  users.push(user);

  res.status(201).json({ status: "success", data: user });
});

// PUT /api/users/:id — update user
router.put("/:id", updateUserRules, validate, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    throw new AppError("User not found", 404);
  }

  const { name, email } = req.body;

  if (email && email !== users[index].email) {
    const exists = users.some((u) => u.email === email && u.id !== id);
    if (exists) {
      throw new AppError("Email already in use", 409);
    }
  }

  users[index] = {
    ...users[index],
    ...(name && { name }),
    ...(email && { email }),
    updatedAt: new Date().toISOString(),
  };

  res.json({ status: "success", data: users[index] });
});

// DELETE /api/users/:id — delete user
router.delete("/:id", idParamRule, validate, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    throw new AppError("User not found", 404);
  }

  users.splice(index, 1);
  res.status(204).send();
});

// Reset for testing
export const resetUsers = () => {
  users = [
    { id: 1, name: "John Doe", email: "john@example.com", createdAt: new Date().toISOString() },
    { id: 2, name: "Jane Smith", email: "jane@example.com", createdAt: new Date().toISOString() },
  ];
  nextId = 3;
};

export default router;
