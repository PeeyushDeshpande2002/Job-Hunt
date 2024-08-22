import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js'
dotenv.config({})
const app = express();
const corsOptions = {
    origin : 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials : true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/company', companyRoute);
app.use('/api/job', jobRoute);
app.use('/api/application', applicationRoute);
mongoose 
const Port = process.env.Port || 3000;
app.listen(Port,  ()=>{
    connectDB();
    console.log(`Server running of port ${Port}`);
    
})