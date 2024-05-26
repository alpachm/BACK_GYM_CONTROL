import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import Exercise, { IExercise } from "./../database/models/exercise.model";
import { NextFunction, Request, Response } from "express";
import {ExtendedExerciseRequest} from "./../interfaces/extended.interfaces";
import User from "./../database/models/user.model";

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
});

export const validIfUserExistFromExercise = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {fk_user}: IExercise = req.body;

    const user = await User.findOne({
        where: {
            pk_user: fk_user,
            status: true
        }
    });

    if(!user) return next(new AppError(`The user with id ${fk_user} was not found`, 404));

    next();
})