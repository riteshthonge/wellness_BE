import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { enrollInSession, getUserData, login, logout, register, verifyEmail } from "../controllers/userController.js";
import { sendLoginOtp } from "../controllers/otpControlle.js";
import { addWellnessSession, getAllExerciseSessions, getAllMeditationSessions, getAllUsers, getAllYogaSessions } from "../controllers/sessionController.js";
import apiUserAuth from "../middlewares/apiUserAuth.js";


const userRouter=express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/get-user-Data',userAuth,getUserData);
userRouter.post('/logout',logout);
userRouter.post('/send-otp',sendLoginOtp);
userRouter.post('/verify-otp',verifyEmail);
userRouter.post('/create-wellness-session',apiUserAuth,addWellnessSession);
userRouter.get('/get-yoga-sessions',apiUserAuth,getAllYogaSessions);
userRouter.get('/get-meditation-sessions',apiUserAuth,getAllMeditationSessions);
userRouter.get('/get-exercise-sessions',apiUserAuth,getAllExerciseSessions);
userRouter.get('/get-users',apiUserAuth,getAllUsers);
userRouter.post('/enrollInto-session',apiUserAuth,enrollInSession);








export default userRouter;