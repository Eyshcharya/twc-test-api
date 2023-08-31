import asyncHandler from "express-async-handler";
import { User } from "../Models/userModel.js";

// Register controller
// route   /register
// request  POST
// access  Public
const userRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400).json({ message: "User already exist" });
    throw new Error("User Already Exist");
  }
  const user = await User.create({
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      message: "Register Successful!",
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
    throw new Error(`Invalid User Data`);
  }
});

// Login controller
// route   /login
// request POST
// access  public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      message: "Login Successful!",
    });
  } else {
    res.status(401).json({ message: "Invalid Email or Password!" });
    throw new Error(`Invalid Email or Password`);
  }
});

// Logout controller
// route   /
// request POST
// access  private
const userLogout = asyncHandler(async (req, res) => {
  // res.cookie('jwt', '', {
  //   httpOnly: true,
  //   expires: new Date(0),
  // });
  res.status(201).json({ message: " User Logged Out" });
});
export { userRegister, userLogin, userLogout };
