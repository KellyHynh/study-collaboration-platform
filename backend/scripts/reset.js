const pool = require("../src/db/database");

async function reset() {
    await pool.query("DROP TABLE IF EXISTS lesson_progress, enrollments, quiz_options, quiz_questions, quizzes, lesson_videos, lesson_attachments, lesson_readings, lessons, chapters, courses, categories, users CASCADE");
    console.log("Database reset.");
    await pool.end();
}

reset().catch(async (error) => {
    console.error(error.message);
    await pool.end();
    process.exitCode = 1;
});