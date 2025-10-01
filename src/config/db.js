// src/config/db.js
import mongoose from "mongoose";

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

/**
 * Close MongoDB connection gracefully
 */
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("🛑 MongoDB Disconnected");
  } catch (err) {
    console.error(`❌ Error while disconnecting MongoDB: ${err.message}`);
  }
};

// Handle app termination (SIGINT / SIGTERM)
process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectDB();
  process.exit(0);
});

export default connectDB;
