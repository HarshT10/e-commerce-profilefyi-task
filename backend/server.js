import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/users.js";

const app = express();

// const corsOptions = {
//   origin: "https://e-commerce-profilefyi-task.vercel.app/",
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));

app.use(express.json());
app.use(cors({ origin: true }));

// Connect to MongoDB
connectDB();

// Use routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
