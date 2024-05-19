import { NextFunction, Request, Response } from "express";
import AppError from "./../utils/appError";
import { ExtendedError } from "interfaces/error.interface";

const handle22P02Error = () => {
    return new AppError("Enter a valid enum type", 400);
}

const sendDevError = (err: ExtendedError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    })
}

const sendProdError = (err: ExtendedError, res: Response) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else {
        res.status(500).json({
            status: "fail",
            message: "Several Internal Error"
        })
    }
}

const globalHandlerError = (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "fail";

    if(err.parent?.code === "22P02") handle22P02Error();

    if(process.env.NODE_ENV === "development") sendDevError(err, res);
    
    if(process.env.NODE_ENV === "production") sendProdError(err, res)
}

export default globalHandlerError;