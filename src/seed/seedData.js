import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import College from "../models/College.js";

dotenv.config();
connectDB();

const colleges = [
  { name: "ABC Engineering College", location: "Hyderabad", course: "Computer Science", fee: 120000 },
  { name: "XYZ Institute of Technology", location: "Bangalore", course: "Electronics", fee: 100000 },
  { name: "Sunrise Business School", location: "Chennai", course: "MBA", fee: 150000 },
  { name: "Greenfield Medical College", location: "Hyderabad", course: "MBBS", fee: 250000 },
  { name: "Oceanview College of Arts", location: "Mumbai", course: "Fine Arts", fee: 90000 },
  { name: "Pioneer Law School", location: "Delhi", course: "LLB", fee: 130000 },
  { name: "Summit Institute of Design", location: "Bangalore", course: "Graphic Design", fee: 95000 },
  { name: "Metro Business Academy", location: "Kolkata", course: "BBA", fee: 110000 },
  { name: "Harmony Music College", location: "Pune", course: "Music", fee: 80000 },
  { name: "Evergreen Engineering Institute", location: "Chennai", course: "Mechanical Engineering", fee: 125000 },
  { name: "Global Science College", location: "Hyderabad", course: "Biotechnology", fee: 140000 },
  { name: "Skyline Institute of Hospitality", location: "Goa", course: "Hotel Management", fee: 115000 },
  { name: "Crestwood Medical School", location: "Bangalore", course: "MBBS", fee: 260000 },
  { name: "Bright Future College", location: "Chennai", course: "Information Technology", fee: 120000 }
];


const seedData = async () => {
  try {
    await College.deleteMany();
    await College.insertMany(colleges);
    console.log("✅ Seed Data Inserted");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
    process.exit(1);
  }
};

seedData();
