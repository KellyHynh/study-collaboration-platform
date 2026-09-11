const query = require("../db/query");

// Get all options belonging to a question.
const getOptionsByQuestionId = async (questionId) => {
    const result = await query(
        `
        SELECT
            id,
            question_id AS "questionId",
            option_key AS "optionKey",
            text,
            is_correct AS "isCorrect",
            position
        FROM quiz_options
        WHERE question_id = $1
        ORDER BY position ASC
        `,
        [questionId]
    );

    return result.rows;
};

// Get a single option.
const getOptionById = async (id) => {
    const result = await query(
        `
        SELECT
            id,
            question_id AS "questionId",
            option_key AS "optionKey",
            text,
            is_correct AS "isCorrect",
            position
        FROM quiz_options
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Create an option for a question.
const createOption = async (questionId, optionData) => {
    const {
        optionKey,
        text,
        isCorrect = false,
        position,
    } = optionData;

    const result = await query(
        `
        INSERT INTO quiz_options (
            question_id,
            option_key,
            text,
            is_correct,
            position
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
            id,
            question_id AS "questionId",
            option_key AS "optionKey",
            text,
            is_correct AS "isCorrect",
            position
        `,
        [
            questionId,
            optionKey,
            text,
            isCorrect,
            position,
        ]
    );

    return result.rows[0];
};

// Update an option.
const updateOption = async (id, optionData) => {
    const updates = [];
    const values = [];
    let parameterIndex = 1;

    const fieldMap = {
        optionKey: "option_key",
        text: "text",
        isCorrect: "is_correct",
        position: "position",
    };

    for (const [field, column] of Object.entries(fieldMap)) {
        if (optionData[field] !== undefined) {
            updates.push(`${column} = $${parameterIndex}`);
            values.push(optionData[field]);
            parameterIndex++;
        }
    }

    // Nothing to update → return the current option.
    if (updates.length === 0) {
        return getOptionById(id);
    }

    values.push(id);

    const result = await query(
        `
        UPDATE quiz_options
        SET ${updates.join(", ")}
        WHERE id = $${parameterIndex}
        RETURNING
            id,
            question_id AS "questionId",
            option_key AS "optionKey",
            text,
            is_correct AS "isCorrect",
            position
        `,
        values
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Delete an option.
const deleteOption = async (id) => {
    const result = await query(
        `
        DELETE FROM quiz_options
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    return result.rows.length > 0;
};

module.exports = {
    getOptionsByQuestionId,
    getOptionById,
    createOption,
    updateOption,
    deleteOption,
};