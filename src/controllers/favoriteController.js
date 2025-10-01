import Favorite from "../models/Favorite.js";

/**
 * @desc    Add a college to favorites
 * @route   POST /api/favorites
 * @access  Protected
 */
export const addFavorite = async (req, res) => {
  try {
    const { collegeId } = req.body;

    if (!collegeId) {
      return res.status(400).json({
        success: false,
        message: "collegeId is required",
      });
    }

    const exists = await Favorite.findOne({ user: req.user._id, collegeId });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "College already in favorites",
      });
    }

    const favorite = await Favorite.create({
      collegeId,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "College added to favorites",
      data: favorite,
    });
  } catch (error) {
    console.error("❌ Error adding favorite:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while adding favorite",
    });
  }
};

/**
 * @desc    Get current user's favorites
 * @route   GET /api/favorites
 * @access  Protected
 */
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate("collegeId", "name location course fee");

    return res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error) {
    console.error("❌ Error fetching favorites:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching favorites",
    });
  }
};

/**
 * @desc    Remove a favorite by ID
 * @route   DELETE /api/favorites/:id
 * @access  Protected
 */
export const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Favorite removed successfully",
    });
  } catch (error) {
    console.error("❌ Error removing favorite:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while removing favorite",
    });
  }
};
