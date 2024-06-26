import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validFields = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  next();
};

export default validFields;
