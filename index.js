import express from 'express';
const app=express();
import dotenv from 'dotenv';
import { approuter } from './src/modules/app.router.js';
import { connectDB } from './DB/connection.js';
dotenv.config();
approuter(app,express);
connectDB();
app.listen(process.env.PORT,()=>{

console.log("app is running");

});