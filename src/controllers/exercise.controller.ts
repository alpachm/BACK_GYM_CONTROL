import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import User from "./../database/models/user.model";
import Routine from "./../database/models/routine.model";
import Exercise, { IExercise } from "./../database/models/exercise.model";
import RoutineExercise from "./../database/models/routine_exercise.model";
import { NextFunction, Request, Response } from "express";
import { formatText } from "./../utils/formatText";
import { ExtendedExerciseRequest } from "./../interfaces/extended.interfaces";

export const createExercise = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, weight, repetitions, img_url, fk_user }: IExercise = req.body;

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

export const createExerciseFromRoutine = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const {routineId} = req.params;
  const {name, weight, repetitions, img_url, fk_user}: IExercise = req.body;

  const routine = await Routine.findOne({
    where: {
      pk_routine: +routineId,
      status: true
    }
  });

  if(!routine) return next(new AppError(`The routine with id ${routineId} was not found`, 404));

  const exercise = await Exercise.create({
    name: formatText(name),
    weight,
    repetitions,
    img_url,
    fk_user,
  });
  
  await RoutineExercise.create({
    fk_routine: +routineId,
    fk_exercise: exercise.pk_exercise
  });

  res.status(201).json({
    status: "success",
    message: `The exercise has been created for routine ${routine.name}`
  })
})

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
});

export const softDeleteExercise = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const exercise = (req as ExtendedExerciseRequest).exercise;

    await exercise.update({
        status: false
    });

    res.status(200).json({
        status: "success",
        message: "The exercise was delete"
    })
})