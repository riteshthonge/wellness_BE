import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
  },
  { timestamps: true }
);



const otpSchema = new mongoose.Schema(
  {
    otp: { type: String, default: "" },
    expireAt: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
const otpModel = mongoose.models.otp || mongoose.model("otp", otpSchema);


export { userModel as User, otpModel ,userModel}; 
