import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import Exercise from "./../database/models/exercise.model";
import { NextFunction, Request, Response } from "express";
import {ExtendedExerciseRequest} from "./../interfaces/extended.interfaces";

export const validIfExerciseExist = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    const exercise = await Exercise.findOne({
        where: {
            pk_exercise: id,
            status: true
        }
    });

    if(!exercise) return next(new AppError(`The exercise with id ${id} was not found`, 404));

    (req as ExtendedExerciseRequest).exercise = exercise;

    next();
})