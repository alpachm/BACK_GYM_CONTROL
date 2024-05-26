import validFields from "./../utils/validFields";
import {body} from "express-validator";

export const createRelationBetweenRoutineExerciseValidations = [
    body("fk_routine").notEmpty().withMessage("ID routine is required").isInt().withMessage("Enter a valid routine id"),
    body("fk_exercise").notEmpty().withMessage("ID exercise is required").isInt().withMessage("Enter a valid exercise id"),
    validFields
];