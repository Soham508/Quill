import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

try {
  await connectDB();
  console.log("Connected to database");
} catch (error) {
  console.error("Error connecting to database:", error);
  process.exit(1); // Terminate the application on connection error
}

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.get("/", (req, res) => {
  console.log("get req");

  res.send("hello");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT} mode on port ${PORT}`);
});
