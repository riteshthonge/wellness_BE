import { sessionModel } from "../models/sessionModel.js";
import { userModel } from "../models/userModels.js";


export const addWellnessSession=async(req,res)=>{
    try {
    const {
      sessionName,
      goal,
      timing,
      duration,
      startDate,
      endDate,
      sessionType,
      createdBy,
    } = req.body;

   
    if (!sessionName || !goal || !timing || !duration || !startDate || !endDate || !sessionType || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }


    const newSession = new sessionModel({
      sessionName,
      goal,
      timing,
      duration,
      startDate,
      endDate,
      sessionType,
      createdBy,
      published: false, 
      members: [], 
    });

    await newSession.save();

    res.status(201).json({
      success: true,
      message: "Wellness session created successfully.",
      session: newSession,
    });
  } catch (error) {
    console.error("Error creating session:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating session.",
    });
  }
}

export const getAllYogaSessions = async (req, res) => {
  try {
    const sessions = await sessionModel.find({sessionType:"Yoga"});
    res.status(200).json({success :true,data:sessions|| []});
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Failed to fetch yoga sessions" });
  }
};


export const getAllExerciseSessions = async (req, res) => {
  try {
    const sessions = await sessionModel.find({sessionType:"Exercise"});

    
    res.status(200).json({success :true,data:sessions || []});
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Failed to fetch yoga sessions" });
  }
};



export const getAllMeditationSessions = async (req, res) => {
  try {
    const sessions = await sessionModel.find({sessionType:"Meditation"});
    res.status(200).json({success :true,data:sessions || []});
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Failed to fetch yoga sessions" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, { _id: 1, name: 1 }); 

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

