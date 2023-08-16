import express from 'express';
import router from './Routes/route.js';
import cors from 'cors';
import connectDB from './DB/db.js';
connectDB();
import { config } from 'dotenv';
config();

const app = express();

// to access req.body and encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// router
app.use('/', router);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running...`);
});
