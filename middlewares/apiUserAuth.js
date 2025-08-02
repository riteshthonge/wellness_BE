import jwt from "jsonwebtoken";
import { userModel } from "../models/userModels.js";

const apiUserAuth = async (req, res, next) => {
  try {
    console.log("ritesh thonge")
    const { token } = req.cookies;
    console.log(token+"Hi");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist.",
      });
    }

   next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token verification failed. " + error.message,
    });
  }
};

export default apiUserAuth;
