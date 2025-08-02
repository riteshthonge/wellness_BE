import mongooese from "mongoose";



const connectDB= async ()  =>{

    mongooese.connection.on('connected',()=>console.log("Databases connected"));
    await mongooese.connect(`${process.env.MONGODB_URI}`);

}

export default connectDB;