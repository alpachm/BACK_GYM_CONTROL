import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import User, { IUser } from "../database/models/user.model";
import bcrypt from "bcryptjs";
import { formatText } from "./../utils/formatText";
import generateJWT from "./../utils/jwt";
import { ExtendedAuthRequest } from "interfaces/extended.interfaces";
import { IChangePassword } from "interfaces/auth.interfaces";

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

    res.status(201).json({
      status: "success",
      message: "The user has been created",
      user: {
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  }
);

export const signin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: IUser = req.body;

    const user: IUser | null = await User.findOne({
      where: {
        email: formatText(email),
      },
    });

    if (!user) {
      next(new AppError("Email or password incorrect, please try again", 401));
    } else {
      if (!(await bcrypt.compare(password, user?.password)))
        next(
          new AppError("Email or password incorrect, please try again", 401)
        );

      const token = await generateJWT(user.pk_user);

      res.status(200).json({
        status: "success",
        message: "Log in successfully",
        user: {
          full_name: `${user.name} ${user.last_name}`,
          email: user.email,
          img_url: user.img_url,
        },
        token,
      });
    }
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as ExtendedAuthRequest).user;
    const { name, last_name, img_url }: IUser = req.body;

    if (!name && !last_name && !img_url) {
      return next(new AppError("Enter at least one camp", 400));
    }

    await user.update({
      name: formatText(name) || user.name,
      last_name: formatText(last_name) || user.last_name,
      img_url: img_url || user.img_url,
    });

    res.status(200).json({
      status: "success",
      message: "User has been updated",
    });
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword }: IChangePassword = req.body;
    const { user } = req as ExtendedAuthRequest;

    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return next(
        new AppError("Email or password is wrong, please try again", 401)
      );
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);

    await user.update({
      password: encryptedPassword,
      passwordChangeAt: new Date(),
    });

    res.status(200).json({
      status: "success",
      message: "The password has been updated"
    })
  }
);
