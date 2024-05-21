import express from "express";
import app from "../app";
import {signup, signin} from "../controllers/auth.controller";
import {signupValidations, signinValidations} from "./../middlewares/validations.middleware";

const router = express.Router();

router.post("/signup", signupValidations, signup)

router.post("/signin", signinValidations, signin)

export default router;