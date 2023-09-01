import express from "express";
import { userSignUp, userLogIn } from '../controllers/userController.js';

const router = express.Router();

//login & signup
router.post("/signup", userSignUp);
router.post("/", userLogIn);


export default router;
