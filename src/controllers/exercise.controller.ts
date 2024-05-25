import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import User from "./../database/models/user.model";
import Exercise, { IExercise } from "./../database/models/exercise.model";
import { NextFunction, Request, Response } from "express";
import { formatText } from "./../utils/formatText";
import { ExtendedExerciseRequest } from "./../interfaces/extended.interfaces";

export const createExercise = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, weight, repetitions, img_url, fk_user }: IExercise = req.body;

    const user = await User.findOne({
      where: {
        pk_user: fk_user,
        status: true,
      },
    });

    if (!user)
      return next(
        new AppError(`The user with id ${fk_user} was not found`, 404)
      );

    const exercise = await Exercise.create({
      name: formatText(name),
      weight,
      repetitions,
      img_url,
      fk_user,
    });

    res.status(201).json({
      status: "success",
      message: "The exercise has been created",
    });
  }
);

export const findExercisesPerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const exercises = await Exercise.findAll({
      where: {
        fk_user: id,
        status: true,
      },
      attributes: {exclude: ["createdAt", "updatedAt", "status"]}
    });

    if(!exercises.length) return (new AppError(`The user with id ${id} does not yet have exercises register`, 404));

    res.status(200).json({
        status: "success",
        message: "All exercises was found",
        data: exercises
    })
  }
);

export const findExerciseById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const exercise = (req as ExtendedExerciseRequest).exercise;

    res.status(200).json({
        status: "success",
        message: "The exercise was found",
        exercise
    })
})