import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    college: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "College", 
      required: true 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // link to logged-in user
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    comment: { 
      type: String, 
      trim: true,
      maxlength: 500 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
