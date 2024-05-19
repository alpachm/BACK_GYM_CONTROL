import express from "express";
import app from "../app";
import {signup} from "../controllers/auth.controller";
import {signupValidations} from "./../middlewares/validations.middleware";

const router = express.Router();

router.post("/signup", signupValidations, signup)

export default router;