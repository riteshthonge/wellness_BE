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



const sessionSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true,
    trim: true,
  },
  goal: {
    type: String,
    required: true,
    trim: true,
  },
  timing: {
    type: String,
    required: true, // e.g., "07:00"
  },
  duration: {
    type: String,
    required: true, // e.g., "30 mins"
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  sessionType: {
    type: String,
    enum: ["Meditation", "Exercise", "Yoga"],
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
   members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: []
    }
  ]

  
}, {
  timestamps: true // adds createdAt and updatedAt
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
const sessionModel = mongoose.models.Session || mongoose.model("Sessin", sessionSchema);



export { userModel as User, sessionModel}; 
