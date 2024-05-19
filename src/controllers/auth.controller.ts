import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import User, { IUser } from "../database/models/user.model";
import bcrypt from "bcryptjs";
import {formatText} from "./../utils/formatText";
import generateJWT from "./../utils/jwt";

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, last_name, email, password, img_url }: IUser = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: formatText(name),
      last_name: formatText(last_name),
      email: formatText(email),
      password: encryptedPassword,
      img_url,
    });

    const token = await generateJWT(user.pk_user);

    res.status(201).json({
      status: "success",
      message: "The user has been created",
      user: {
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      },
      token
    });
  }
);
