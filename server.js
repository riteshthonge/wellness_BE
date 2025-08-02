import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

import path from "path";
import { fileURLToPath } from "url";






const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedApi=['http://localhost:3000']

const allowedOrigins = [
  'http://localhost:3000',
  'https://wellness-fe.vercel.app'
];

const port =process.env.PORT ||4000;
connectDB();

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(cookieParser())

app.get('/',(req,res)=>
    res.send("hello")
)




app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);




app.listen(port,()=> console.log(`app listening on port ${port}`));