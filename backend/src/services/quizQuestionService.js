const query = require("../db/query");

// Get all questions belonging to a quiz.
const getQuestionsByQuizId = async (quizId) => {
    const result = await query(
        `
        SELECT
            id,
            quiz_id AS "quizId",
            type,
            question,
            position,
            image_url AS "imageUrl",
            image_file_name AS "imageFileName",
            image_mime_type AS "imageMimeType",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM quiz_questions
        WHERE quiz_id = $1
        ORDER BY position ASC
        `,
        [quizId]
    );

    return result.rows;
};

// Get a single question.
const getQuestionById = async (id) => {
    const result = await query(
        `
        SELECT
            id,
            quiz_id AS "quizId",
            type,
            question,
            position,
            image_url AS "imageUrl",
            image_file_name AS "imageFileName",
            image_mime_type AS "imageMimeType",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM quiz_questions
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Create a question inside a quiz.
const createQuestion = async (quizId, questionData) => {
    const {
        type,
        question,
        position,
        imageUrl = null,
        imageFileName = null,
        imageMimeType = null,
    } = questionData;

    const result = await query(
        `
        INSERT INTO quiz_questions (
            quiz_id,
            type,
            question,
            position,
            image_url,
            image_file_name,
            image_mime_type
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
            id,
            quiz_id AS "quizId",
            type,
            question,
            position,
            image_url AS "imageUrl",
            image_file_name AS "imageFileName",
            image_mime_type AS "imageMimeType",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [
            quizId,
            type,
            question,
            position,
            imageUrl,
            imageFileName,
            imageMimeType,
        ]
    );

    return result.rows[0];
};

// Update a question.
const updateQuestion = async (id, questionData) => {
    const updates = [];
    const values = [];
    let parameterIndex = 1;

    const fieldMap = {
        type: "type",
        question: "question",
        position: "position",
        imageUrl: "image_url",
        imageFileName: "image_file_name",
        imageMimeType: "image_mime_type",
    };

    for (const [field, column] of Object.entries(fieldMap)) {
        if (questionData[field] !== undefined) {
            updates.push(`${column} = $${parameterIndex}`);
            values.push(questionData[field]);
            parameterIndex++;
        }
    }

    // Nothing to update → return the current question.
    if (updates.length === 0) {
        return getQuestionById(id);
    }

    updates.push("updated_at = CURRENT_TIMESTAMP");

    values.push(id);

    const result = await query(
        `
        UPDATE quiz_questions
        SET ${updates.join(", ")}
        WHERE id = $${parameterIndex}
        RETURNING
            id,
            quiz_id AS "quizId",
            type,
            question,
            position,
            image_url AS "imageUrl",
            image_file_name AS "imageFileName",
            image_mime_type AS "imageMimeType",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        values
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Delete a question.
// Related options are removed by ON DELETE CASCADE.
const deleteQuestion = async (id) => {
    const result = await query(
        `
        DELETE FROM quiz_questions
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    return result.rows.length > 0;
};

module.exports = {
    getQuestionsByQuizId,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
};