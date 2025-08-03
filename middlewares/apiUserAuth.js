import jwt from "jsonwebtoken";
import { userModel } from "../models/userModels.js";

const apiUserAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present and well-formed
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
    }

    // ✅ Extract token from header
    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }

    // ✅ Optional: Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist.",
      });
    }

    // ✅ Attach user ID to request for further use
    req.body.userId = userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token verification failed. " + error.message,
    });
  }
};

export default apiUserAuth;
