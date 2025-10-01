import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import collegeRoutes from "./routes/collegeRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/colleges", collegeRoutes);
app.use("/reviews", reviewRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/users", userRoutes);

// Error Handler
app.use(errorHandler);

export default app;
