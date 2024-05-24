import validFields from "./../utils/validFields";
import { body } from "express-validator";

export const createRoutineValidations = [
  body("fk_user")
    .notEmpty()
    .withMessage("User id is required")
    .isInt()
    .withMessage("Enter a valid user id"),
  body("fk_day")
    .notEmpty()
    .withMessage("Day id is required")
    .isInt()
    .withMessage("Enter a valid day id"),
  body("name")
    .notEmpty()
    .withMessage("The name is required")
    .isString()
    .withMessage("Enter a valid name"),
  validFields,
];
