import express from "express";
import {signup, signin, updateUser} from "../controllers/auth.controller";
import {signupValidations, signinValidations, updateUserValidations} from "../validations/auth.validations";
import {validIfUserExist} from "./../middlewares/auth.middlewares";
import {protect} from "./../middlewares/authentication.middlewares";

const router = express.Router();

router.post("/signup", signupValidations, signup);

router.post("/signin", signinValidations, signin);

router.use(protect);

router.post("/update/:id", validIfUserExist, updateUserValidations, updateUser);

export default router;