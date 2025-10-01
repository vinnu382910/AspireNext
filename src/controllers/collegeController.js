import College from "../models/College.js";

// @desc    Get all colleges with filters, search, and sorting
// @route   GET /api/colleges
// @access  Public
export const getColleges = async (req, res) => {
  try {
    const { location, course, minFee, maxFee, search, sort } = req.query;
    let filter = {};

    // Filters
    if (location) filter.location = location.trim();
    if (course) filter.course = course.trim();

    if (minFee || maxFee) {
      const min = parseInt(minFee) || 0;
      const max = parseInt(maxFee) || 10000000;
      filter.fee = { $gte: min, $lte: max };
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // Query
    let query = College.find(filter);

    // Sorting
    if (sort === "lowtohigh") query = query.sort({ fee: 1 });
    if (sort === "hightolow") query = query.sort({ fee: -1 });

    const colleges = await query;

    if (!colleges.length) {
      return res.status(404).json({
        success: false,
        message: "No colleges found matching your criteria",
      });
    }

    return res.status(200).json({
      success: true,
      count: colleges.length,
      data: colleges,
    });
  } catch (error) {
    console.error("Error fetching colleges:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
