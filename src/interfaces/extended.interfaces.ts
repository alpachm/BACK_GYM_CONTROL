import User, { IUser } from "database/models/user.model";
import { Request } from "express";
import Routine from "./../database/models/routine.model";

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