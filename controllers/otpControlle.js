import { otpModel, userModel } from "../models/userModels.js";
import transporter from "../config/nodeMailer.js";
import {
    EMAIL_VERIFY_TEMPLATE,
    PASSWORD_RESET_TEMPLATE,
  } from "../config/emailTemplates.js";

export const sendLoginOtp=async(req,res)=>{
    try{
const {email}=req.body;
if(!email){
    return res.json({success:false,message:"missing Details"});

}
const user=await userModel.findOne({email});
if(!user){
    return res.json({success:false,message:"user not found !"});

}
const otp = String(Math.floor(100000 + Math.random() * 900000));
const expireAt=Date.now() + 24 * 60 * 60 * 1000;
console.log(user._id);

const newOtp=new otpModel({
    otp,
    expireAt,
    userId:user._id,
    email
})

await newOtp.save();


const mailOption = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Acount verification otp",

    html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
      "{{email}}",
      user.email
    ),
  };

  await transporter.sendMail(mailOption);
  return res.json({
    success: true,
    message: "verification OTP sent to your email",
  });
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }

}