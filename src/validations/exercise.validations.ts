import validFields from "./../utils/validFields";
import { body } from "express-validator";

export const createExerciseValidations = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Enter a valid name"),
  body("fk_user")
    .notEmpty()
    .withMessage("The user id is required")
    .isInt()
    .withMessage("Enter a valid id"),
  validFields,
];
