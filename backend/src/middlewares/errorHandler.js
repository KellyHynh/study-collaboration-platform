// Global error handler
// Catches errors passed through next(error) from controllers
// and returns a consistent error response to the client.

const errorHandler = (err, req, res, next) => {
    console.error("API Error:", err);

    if (err.type === "entity.too.large") {
        return res.status(413).json({
            message: "Uploaded content is too large",
        });
    }

    // PostgreSQL foreign key violation
    if (err.code === "23503") {
        return res.status(400).json({
            message: "Referenced resource does not exist",
        });
    }

    // PostgreSQL unique constraint violation
    if (err.code === "23505") {
        return res.status(409).json({
            message: "Resource already exists",
        });
    }

    // PostgreSQL check constraint violation
    if (err.code === "23514") {
        return res.status(400).json({
            message: "Invalid value",
        });
    }

    // Default server error
    res.status(500).json({
        message: "Internal server error",
    });
};

module.exports = errorHandler;