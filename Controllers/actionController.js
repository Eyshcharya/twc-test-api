import asyncHandler from 'express-async-handler';
import { User } from '../Models/userModel.js';

// Register controller
// route   /register
// request  POST
// access  Public
const userRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User Already Exists');
  }
  const user = await User.create({
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      user,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid User Data`);
  }
});

export { userRegister };
