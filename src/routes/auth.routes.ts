import express from "express";
import {signup, signin, updateUser, updatePassword} from "../controllers/auth.controller";
import {signupValidations, signinValidations, updateUserValidations, changePasswordValidations} from "../validations/auth.validations";
import {validIfUserExist} from "./../middlewares/auth.middlewares";
import {protect, protectedAccountOwner} from "./../middlewares/authentication.middlewares";

const router = express.Router();

router.post("/signup", signupValidations, signup);

router.post("/signin", signinValidations, signin);

router.use(protect);

router.post("/update/:id", validIfUserExist, updateUserValidations, updateUser);

router.post("/changePassword/:id", validIfUserExist, protectedAccountOwner, changePasswordValidations, updatePassword)

export default router;