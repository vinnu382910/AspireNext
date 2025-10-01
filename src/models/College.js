import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  course: { type: String, required: true },
  fee: { type: Number, required: true },
});

export default mongoose.model("College", collegeSchema);
