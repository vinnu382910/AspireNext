// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) return res.status(401).json({ success:false, message: "User not found" });

      next(); // user is authenticated
    } catch (error) {
      return res.status(401).json({ success:false, message: "Not authorized", error: error.message });
    }
  }

  if (!token) {
    return res.status(401).json({ success:false, message: "No token, not authorized" });
  }
};
