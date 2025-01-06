import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API çalışıyor" });
});

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
