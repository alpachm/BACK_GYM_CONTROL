import User, { IUser } from "database/models/user.model";
import { Request } from "express";
import { BaseError } from "sequelize";

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

export interface ExtendedRequest extends Request {
    user: User;
    sessionUser: User;
}