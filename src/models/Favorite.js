import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to logged-in user
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", favoriteSchema);
