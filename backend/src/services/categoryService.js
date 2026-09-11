const query = require("../db/query");

// Get all categories.
const getAllCategories = async () => {
    const result = await query(
        `
        SELECT
            id,
            name,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM categories
        ORDER BY name ASC
        `
    );

    return result.rows;
};

// Get a single category by ID.
const getCategoryById = async (id) => {
    const result = await query(
        `
        SELECT
            id,
            name,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM categories
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Create a category.
const createCategory = async (name) => {
    const result = await query(
        `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING
            id,
            name,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [name]
    );

    return result.rows[0];
};

// Update a category.
const updateCategory = async (id, name) => {
    const result = await query(
        `
        UPDATE categories
        SET
            name = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING
            id,
            name,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [name, id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Delete a category.
const deleteCategory = async (id) => {
    const result = await query(
        `
        DELETE FROM categories
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    return result.rows.length > 0;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};