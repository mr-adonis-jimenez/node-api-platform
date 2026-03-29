import { body, param, validationResult } from "express-validator";
import { AppError } from "./errorHandler.js";

export const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg);
    throw new AppError(messages.join("; "), 400);
  }
  next();
};

export const createUserRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
];

export const updateUserRules = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .escape(),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
];

export const idParamRule = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
];
