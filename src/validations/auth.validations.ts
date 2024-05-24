import { body } from "express-validator";
import validFields from "./../utils/validFields";

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

export const signinValidations = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  validFields,
];

export const updateUserValidations = [
  body("name").isString().withMessage("Enter a valid name"),
  body("last_name").isString().withMessage("Enter a valid last name"),
  body("img_url").isString().withMessage("Enter a valid image"),
  validFields,
];

export const changePasswordValidations = [
  body("currentPassword")
    .notEmpty()
    .withMessage("The current password is required")
    .isString()
    .withMessage("Enter a valid password"),
  body("newPassword")
    .notEmpty()
    .withMessage("The new password is required")
    .isString()
    .withMessage("Enter a valid password")
    .isLength({ min: 7 })
    .withMessage("The password must be at least 7 characters"),
  validFields,
];
