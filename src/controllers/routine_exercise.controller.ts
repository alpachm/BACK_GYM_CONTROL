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

export const deleteRelationForRoutineExercise = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {routineId, exerciseId} = req.params;

    const routine = await Routine.findOne({
        where: {
            pk_routine: routineId,
            status: true
        }
    });

    const exercise = await Exercise.findOne({
        where: {
            pk_exercise: exerciseId,
            status: true
        }
    });

    if(!routine) return next(new AppError(`The routine with id ${routineId} was not found`, 404));
    if(!exercise) return next(new AppError(`The exercise with id ${exerciseId} was not found`, 404));

    const relation = await RoutineExercise.findOne({
        where: {
            fk_routine: routineId,
            fk_exercise: exerciseId
        }
    });

    if(!relation) return next(new AppError(`Relation between routine ${routine.name} and exercise ${exercise.name} was not found`, 404));

    await relation.destroy();

    res.status(200).json({
        status: "success",
        message: "The exercise has been unlinked"
    })
})