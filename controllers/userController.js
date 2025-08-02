import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { userModel, otpModel } from "../models/userModels.js";
import { sessionModel } from "../models/sessionModel.js";

export const register = async (req, res) => {
  try {
    const { email, phone, name, password } = req.body;

    if (!email || !phone || !name || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    

    return res.json({
      success: true,
      message: "SignUp successfully! Go To Login Page for Login",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    const user = await userModel.findOne({ phone });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful!",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ sucsess: false, message: "user not found" });
    }
    console.log();
    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        id: user._id,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.json({ succsess: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "logged out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.json({ success: false, message: "missing Details" });
    }
    const user = await userModel.findOne({ email });
    const resendOtp = await otpModel.findOne({ email }).sort({ createdAt: -1 });
    console.log(resendOtp);
    if (resendOtp.otp !== otp) {
      return res.json({ success: false, message: "otp doesnt match" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true, message: "login succesfull!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



export const enrollInSession = async (req, res) => {
  try {
    const { user_id, session_id } = req.body;

    if (!user_id || !session_id) {
      return res.status(400).json({ success: false, message: "Missing user_id or session_id" });
    }

    const session = await sessionModel.findById(session_id);

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    // Prevent organizer from enrolling
    if (user_id === session.createdBy.toString()) {
      return res.status(400).json({ success: false, message: "Organizer cannot enroll as a member" });
    }

    // Check if already enrolled
    if (session.members.includes(user_id)) {
      return res.status(400).json({ success: false, message: "User already enrolled" });
    }

    // Add user to members
    session.members.push(user_id);
    await session.save();

    res.status(200).json({ success: true, message: "Enrolled successfully", data: session });
  } catch (error) {
    console.error("Error enrolling in session:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({}, { _id: 1, name: 1 });
    res.status(200).json({ success: true,data: users ||[]});
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users", error: error.message });
  }
};


