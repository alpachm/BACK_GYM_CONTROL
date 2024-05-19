import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const validFields = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  next();
};

export const signupValidations = [
  body("name")
    .notEmpty()
    .withMessage("The name is required")
    .isString()
    .withMessage("Enter a valid name")
    .isLength({ min: 2 })
    .withMessage("Enter a valid name"),
  body("last_name")
    .notEmpty()
    .withMessage("The last last name is required")
    .isString()
    .withMessage("Enter a valid last name")
    .isLength({ min: 2 })
    .withMessage("Enter a valid last name"),
  body("email")
    .notEmpty()
    .withMessage("The email is required")
    .isEmail()
    .withMessage("Enter a valid email"),
  body("password")
    .notEmpty()
    .withMessage("The password is required")
    .isString()
    .withMessage("Enter a valid password")
    .isLength({ min: 7 })
    .withMessage("The password must be at least 7 characters"),
  body("img_url").isString().withMessage("Enter a valid image"),
  validFields,
];
