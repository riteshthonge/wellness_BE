import jwt from "jsonwebtoken";

 const userAuth=(req,res,next)=>{
   
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ success: false, message: "Not authorized, no token" });
}
  const token = authHeader.split(" ")[1];
  console.log(token +"hi");

if(!token){
    return res.json({success:false,message:"not authrised login login, again"})
}
try{
const tokenDecode= jwt.verify(token,process.env.JWT_SECRET)
if(tokenDecode.id){
req.body.userId=tokenDecode.id;
}
else{
    return res.json({success:false,message:"not authrised login, login again"})
}
next()
}
catch(error){
    return res.json({sucsess:false,message:error.message});
}

}
export default userAuth;