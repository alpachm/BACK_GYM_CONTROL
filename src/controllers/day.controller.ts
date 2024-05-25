import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import User from "./../database/models/user.model";
import Day from "./../database/models/day.model";
import Routine from "./../database/models/routine.model";
import RoutineExercise from "./../database/models/routine_exercise.model";
import Exercise from "./../database/models/exercise.model";
import { Request, Response, NextFunction } from "express";
import getEnumKeyValue from "./../utils/getEnumKeyValue";
import { EDays } from "./../enums/day.enums";

export const findRoutinePerDay = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { dayId, userId } = req.params;

    if (+dayId < 1 || +dayId > 7)
      return next(new AppError("Enter a valid day", 400));

    const user = await User.findOne({
      where: {
        pk_user: +userId,
        status: true,
      },
    });

    if (!user)
      return next(
        new AppError(`The user with id ${userId} was not found`, 404)
      );

    const data = await Day.findOne({
      where: {
        pk_day: +dayId,
      },
      attributes: {exclude: ["createdAt", "updatedAt"]},
      include: [
        {
          model: Routine,
          attributes: ["pk_routine", "name"],
          where: {
            fk_user: +userId,
            status: true,
          },
          include: [
            {
              model: RoutineExercise,
              attributes: ["pk_routine_exercise"],
              include: [
                {
                  model: Exercise,
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
              ],
            },
          ],
        },
      ],
    });

    const day = getEnumKeyValue(EDays, +dayId);

    if (!data)
      return next(new AppError(`The day with id ${dayId} was not found`, 404));

    res.status(200).json({
      status: "success",
      message: `The routine for ${day} was found`,
      data,
    });
  }
);
