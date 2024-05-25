import User, { IUser } from "database/models/user.model";
import { Request } from "express";
import Routine from "./../database/models/routine.model";
import Exercise from "./../database/models/exercise.model";

export interface ExtendedError extends Error {
    statusCode: number;
    status: string;
    message: string;
    isOperational: boolean;
    parent?: {
        code?: string;
        [key: string]: any;
    };
};

export interface ExtendedAuthRequest extends Request {
    user: User;
    sessionUser: User;
}

export interface ExtendedRoutineRequest extends Request {
    routine: Routine
}

export interface ExtendedExerciseRequest extends Request {
    exercise: Exercise
}