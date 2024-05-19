import { NextFunction, Request, Response } from "express";
import AppError from "./../utils/appError";
import catchAsync from "./../utils/catchAsync";

export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
        status: "success",
        message: "The user has been created"
    })
})