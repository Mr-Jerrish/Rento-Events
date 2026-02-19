import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../utils/commonResponse.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// signup
export const signupUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    // return res.status(400).json({ message: "User already exists" });
    return sendErrorResponse(res, {
      message: "User already exists",
      statusCode: 400,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });
  return sendSuccessResponse(res, {
    key: "userId",
    data: {
      user_id: user._id,
    },
    message: "User Id Created Successfully",
  });
};

// SIGNIN
export const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return sendErrorResponse(res, {
      message: "User not found",
      statusCode: 404,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return sendErrorResponse(res, {
      message: "Invalid credentials",
      statusCode: 400,
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return sendSuccessResponse(res, {
    key: "userData",
    data: {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    },
    message: "Signin successful",
  });
});

// changepassword
export const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  // check user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // check current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    // return res.status(400).json({ message: "Current password is incorrect" });
    return sendErrorResponse(res, {
      message: "Current password is incorrect",
      statusCode: 400,
    });
  }

  // hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // update password
  user.password = hashedPassword;
  await user.save();

  // res.status(200).json({
  //   message: "Password updated successfully",
  // });
  return sendSuccessResponse(res, {
    key: "userData",
    data: {
      email: user.email,
    },
    message: "Update Password successful",
  });
};
