import Review from "../models/Review.js";

/**
 * @desc    Add a new review
 * @route   POST /api/reviews
 * @access  Protected
 */
export const addReview = async (req, res) => {
  try {
    const { college, rating, comment } = req.body;

    if (!college || !rating) {
      return res.status(400).json({
        success: false,
        message: "Both college and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const review = await Review.create({
      college,
      rating,
      comment: comment?.trim() || "",
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    console.error("❌ Error adding review:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while adding review",
    });
  }
};

/**
 * @desc    Get all reviews with filters, search, sorting & pagination
 * @route   GET /api/reviews
 * @access  Public
 */
export const getReviews = async (req, res) => {
  try {
    const { collegeId, minRating, maxRating, search, sort, page, limit } =
      req.query;

    const filter = {};
    if (collegeId) filter.college = collegeId;
    if (minRating || maxRating) {
      filter.rating = {
        $gte: parseInt(minRating) || 1,
        $lte: parseInt(maxRating) || 5,
      };
    }
    if (search) {
      filter.comment = { $regex: search, $options: "i" };
    }

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNum - 1) * pageSize;

    let query = Review.find(filter)
      .populate("college", "name location course")
      .populate("user", "name email");

    switch (sort) {
      case "newest":
        query = query.sort({ createdAt: -1 });
        break;
      case "oldest":
        query = query.sort({ createdAt: 1 });
        break;
      case "highestrating":
        query = query.sort({ rating: -1 });
        break;
      case "lowestrating":
        query = query.sort({ rating: 1 });
        break;
    }

    const [reviews, total] = await Promise.all([
      query.skip(skip).limit(pageSize),
      Review.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / pageSize),
      data: reviews,
    });
  } catch (error) {
    console.error("❌ Error fetching reviews:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching reviews",
    });
  }
};
