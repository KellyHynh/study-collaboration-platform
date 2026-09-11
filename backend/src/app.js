const express = require("express");
const cors = require("cors");
const path = require("path");

const courseRoutes = require("./routes/courseRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const readingRoutes = require("./routes/readingRoutes");
const videoRoutes = require("./routes/videoRoutes");
const quizRoutes = require("./routes/quizRoutes");
const quizQuestionRoutes = require("./routes/quizQuestionRoutes");
const quizOptionRoutes = require("./routes/quizOptionRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const lessonProgressRoutes = require("./routes/lessonProgressRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const lessonAttachmentRoutes = require("./routes/lessonAttachmentRoutes");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

// ============================================================
// Global middleware
// ============================================================

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use("/demo-assets", express.static(path.join(__dirname, "../demo-assets")));

// ============================================================
// Health check
// Used to verify that the API server is running correctly.
// ============================================================

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "KnoVerse backend is running",
    });
});

// ============================================================
// API routes
// ============================================================

// Course endpoints
app.use("/api/courses", courseRoutes);

// Chapter endpoints
app.use("/api/chapters", chapterRoutes);

// Lesson endpoints
app.use("/api/lessons", lessonRoutes);

// Reading content endpoints
app.use("/api/readings", readingRoutes);

// Video content endpoints
app.use("/api/videos", videoRoutes);

// Quiz endpoints
app.use("/api/quizzes", quizRoutes);

// Quiz question endpoints
app.use("/api/quiz-questions", quizQuestionRoutes);

// Quiz option endpoints
app.use("/api/quiz-options", quizOptionRoutes);

// Enrollment endpoints
app.use("/api/enrollments", enrollmentRoutes);

// Lesson progress endpoints
app.use("/api/lesson-progress", lessonProgressRoutes);

// User endpoints
app.use("/api/users", userRoutes);

// Category endpoints
app.use("/api/categories", categoryRoutes);

// Lesson attachment endpoints
app.use("/api/attachments", lessonAttachmentRoutes);

// ============================================================
// Global error handler
// Must be registered after all routes.
// ============================================================

app.use(errorHandler);

module.exports = app;