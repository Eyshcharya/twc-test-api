import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected : ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};
export default connectDB;
