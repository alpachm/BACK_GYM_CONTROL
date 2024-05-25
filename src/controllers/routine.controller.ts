import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import Routine, { IRoutine } from "./../database/models/routine.model";
import User from "./../database/models/user.model";
import RoutineExercise from "./../database/models/routine_exercise.model";
import Exercise from "./../database/models/exercise.model";
import { NextFunction, Request, Response } from "express";
import { formatText } from "./../utils/formatText";
import { EDays } from "./../enums/day.enums";
import getEnumKeyValue from "./../utils/getEnumKeyValue";
import {ExtendedRoutineRequest} from "./../interfaces/extended.interfaces";

export const createRoutine = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fk_user, fk_day, name }: IRoutine = req.body;

    const user = await User.findOne({
      where: {
        pk_user: fk_user,
        status: true,
      },
    });

    if (!user)
      return next(new AppError(`User with id ${fk_user} was not found`, 404));

    if (fk_day < EDays.Monday || fk_day > EDays.Sunday) {
      return next(new AppError("Enter a valid day", 400));
    }

    const routine = await Routine.create({
      fk_user,
      fk_day,
      name: formatText(name),
    });

    const selectedRoutineDay = getEnumKeyValue(EDays, fk_day);

    res.status(201).json({
      status: "success",
      message: `The routine for ${selectedRoutineDay} has been created`,
      routine: {
        id: routine.pk_routine,
        name: routine.name
      },
    });
  }
);

export const findAllRoutineByFkUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const {userId} = req.params;

  const user = await User.findOne({
    where: {
      pk_user: userId,
      status: true
    }
  });

  if(!user) return next(new AppError(`The user with id ${userId} don't exist`, 404));

  const routines = await Routine.findAll({
    where: {
      fk_user: user.pk_user
    },
    attributes: {exclude: ["createdAt", "updatedAt"]},
    include: [{
      model: RoutineExercise,
      attributes: ["pk_routine_exercise"],
      include: [{
        model: Exercise,
        attributes: {exclude: ["createdAt", "updatedAt"]}
      }]
    }]
  });

  if(!routines.length) return next(new AppError(`There is no routines from the user with id ${user.pk_user}`, 404));

  res.status(200).json({
    status: "success",
    message: "All routines were listed",
    routines
  })
});

export const unlinkDailykRoutine = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const routine = (req as ExtendedRoutineRequest).routine;

  await routine.update({
    status: false
  });

  const day = getEnumKeyValue(EDays, routine.fk_day);

  res.status(200).json({
    status: "success",
    message: `The routine has been disabled for the day ${day}`
  })
})

export const deleteRoutine = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const routine = (req as ExtendedRoutineRequest).routine;

    await routine.destroy();

    res.status(200).json({
      status: "success",
      message: "The routine was deleted"
    })
});