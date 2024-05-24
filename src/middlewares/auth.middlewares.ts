import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import User, { IUser } from "./../database/models/user.model";
import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "interfaces/extended.interfaces";
import {formatText} from "./../utils/formatText";

export const validIfUserExist = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    const user = await User.findOne({
        where: {
            pk_user: id,
            status: true
        }
    })

    if(!user){
        return next(new AppError(`The user with id ${id} don't exist`, 404));
    };

    (req as ExtendedRequest).user = user;

    next();
});

export const validIfEmailExist = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email}: IUser = req.body;

    const user = await User.findOne({
        where: {
            email: formatText(email)
        }
    });

    if(user) return next(new AppError("The email is already registered, enter another email", 401));
});