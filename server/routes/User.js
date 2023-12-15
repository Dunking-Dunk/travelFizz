import express from "express";
import ErrorHandler from "../utils/Error.js";
import User from "../models/User.js";
import sendToken from "../utils/sendToken.js";
import { authenticatedUser} from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, password, email } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

router.post("/login", async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email)
    return next(new ErrorHandler("Please enter email and password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password", 401));

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid)
    return next(new ErrorHandler("Invalid email or password", 401));

  sendToken(user, 201, res);
});

router.post("/logout", async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

router.get("/me", authenticatedUser, async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

router.put('/me', authenticatedUser, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body);

  res.status(200).json({
    success: true,
    user,
  });
})


export default router;
