import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import Routine, { IRoutine } from "./../database/models/routine.model";
import { NextFunction, Request, Response } from "express";
import getEnumKeyValue from "./../utils/getEnumKeyValue";
import {EDays} from "./../enums/day.enums";
import {ExtendedRoutineRequest} from "./../interfaces/extended.interfaces";

export const validRoutineDay = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {fk_user, fk_day}: IRoutine = req.body;

    const routine = await Routine.findOne({
        where: {
            fk_user,
            fk_day,
            status: true
        }
    });

    const day = getEnumKeyValue(EDays, fk_day);

    if(routine) return next(new AppError(`There is already a routine assigned to the day ${day}`, 400));

    next();
})

export const validIfRoutineExist = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    const routine = await Routine.findOne({
        where: {
            pk_routine: id,
            status: true
        }
    });

    if(!routine) {
        return next(new AppError(`The routine with id ${id} don't exist`, 404));
    };

    (req as ExtendedRoutineRequest).routine = routine;

    next();
})