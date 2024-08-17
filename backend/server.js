import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Use routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
