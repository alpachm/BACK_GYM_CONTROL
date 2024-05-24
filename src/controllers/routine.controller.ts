import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import Routine, { IRoutine } from "./../database/models/routine.model";
import User from "./../database/models/user.model";
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

export const deleteRoutine = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const routine = (req as ExtendedRoutineRequest).routine;

    await routine.destroy();

    res.status(200).json({
      status: "success",
      message: "The routine was deleted"
    })
})
