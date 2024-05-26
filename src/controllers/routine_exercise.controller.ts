import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import RoutineExercise, {IRoutineExercise} from "./../database/models/routine_exercise.model";
import Routine from "./../database/models/routine.model";
import Exercise from "./../database/models/exercise.model";
import { NextFunction, Request, Response } from "express";

export const createRelationForRoutineExercise = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {fk_routine, fk_exercise}: IRoutineExercise = req.body;

    const routine = await Routine.findOne({
        where: {
            pk_routine: fk_routine,
            status: true
        }
    });

    const exercise = await Exercise.findOne({
        where: {
            pk_exercise: fk_exercise,
            status: true
        }
    });

    if(!routine) return next(new AppError(`The routine with id ${fk_routine} was not found`, 404));
    if(!exercise) return next(new AppError(`The exercise with id ${fk_exercise} was not found`, 404));

    await RoutineExercise.create({fk_routine, fk_exercise});

    res.status(201).json({
        status: "success",
        message: "The relation between routine and exercise has been created"
    });
});