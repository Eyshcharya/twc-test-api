import express from 'express';
import router from './Routes/route.js';
import connectDB from './DB/db.js';
connectDB();
import { config } from 'dotenv';
config();

const app = express();

// router
app.use('/', router);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running...`);
});
