import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "./../database/models/user.model";
import { ExtendedAuthRequest } from "interfaces/extended.interfaces";

interface DecodedToken extends JwtPayload {
    id: number;
    iat: number;
    exp: number;
  }

  const verifyToken = (token: string, secret: string): Promise<DecodedToken> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded as DecodedToken);
      });
    });
  };

  export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
  
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) {
      return next(
        new AppError("You are not logged in. Please login to get access", 401)
      );
    }
  
    const decoded = await verifyToken(token, process.env.SECRET_JWT_SEED as string);
  
    const user = await User.findOne({
      where: {
        pk_user: decoded.id,
        status: true,
      },
    });
  
    if (!user) {
      return next(
        new AppError("The owner of this token is not longer available", 401)
      );
    }
  
    if (user.passwordChangeAt) {
      const changedTimeStamp = Math.floor(user.passwordChangeAt.getTime() / 1000);
  
      if (decoded.iat < changedTimeStamp) {
        return next(
          new AppError("User recently changed password, please login again", 401)
        );
      }
    }
  
    (req as ExtendedAuthRequest).sessionUser = user;
  
    next();
  });

  export const protectedAccountOwner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {user, sessionUser} = req as ExtendedAuthRequest;

    console.log({user, sessionUser})

    if(user.pk_user !== sessionUser.pk_user){
      return next(new AppError("You don't have permission to perform this action", 401));
    }

    next();
  })