import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import 'express-async-errors'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import ErrorHandler from './middleware/errorHandler.js';
import UserRoutes  from './routes/User.js'
import RecommendationRoutes from './routes/Recommendation.js'
import mongoose from 'mongoose';

const app = express()
const PORT = 3001

mongoose
  .connect('mongodb+srv://hursunss:ihYZ1RCzlyWhRxcy@cluster1.dtyvyye.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("successfully connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({ origin: "*", credentials: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/ai', RecommendationRoutes)
app.use('/api/users',UserRoutes)


app.use(ErrorHandler);

app.listen(PORT, () => {
    console.log(`app listening to port ${PORT}`)
})