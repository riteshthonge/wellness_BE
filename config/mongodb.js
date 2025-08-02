import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("✅ Database connected successfully"));
    mongoose.connection.on("error", (err) => console.error("❌ MongoDB connection error:", err));

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsAllowInvalidCertificates: false,
    });

  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1); // Optional: Exit the app if DB fails to connect
  }
};

export default connectDB;
