const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const { protect, adminOnly } = require("./middleware/authMiddleware");
const categoryRoutes = require("./routes/categoryRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const videoRoutes = require("./routes/videoRoutes");
const quizRoutes = require("./routes/quizRoutes");
const testRoutes = require("./routes/testRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/quizzes", quizRoutes);

app.get("/", (req, res) => {
    res.send("NSL Backend is running!");
});

app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "You are authenticated!",
        user: req.user
    });
});

app.get("/api/admin-test", protect, adminOnly, (req, res) => {
    res.json({
        message: "Welcome Admin! You have access."
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});