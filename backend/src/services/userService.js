const query = require("../db/query");

// Get all users.
const getAllUsers = async () => {
    const result = await query(
        `
        SELECT
            id,
            name,
            email,
            phone,
            avatar_url AS "avatarUrl",
            bio,
            country,
            timezone,
            language,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM users
        ORDER BY created_at DESC
        `
    );

    return result.rows;
};

// Get a single user by ID.
const getUserById = async (id) => {
    const result = await query(
        `
        SELECT
            id,
            name,
            email,
            phone,
            avatar_url AS "avatarUrl",
            bio,
            country,
            timezone,
            language,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// Create a user.
const createUser = async (userData) => {
    const {
        name,
        email,
        phone,
        passwordHash,
        avatarUrl,
        bio,
        country,
        timezone,
        language,
    } = userData;

    const result = await query(
        `
        INSERT INTO users (
            name,
            email,
            phone,
            password_hash,
            avatar_url,
            bio,
            country,
            timezone,
            language
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING
            id,
            name,
            email,
            phone,
            avatar_url AS "avatarUrl",
            bio,
            country,
            timezone,
            language,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        `,
        [
            name,
            email ?? null,
            phone ?? null,
            passwordHash ?? null,
            avatarUrl ?? null,
            bio ?? null,
            country ?? null,
            timezone ?? null,
            language ?? null,
        ]
    );

    return result.rows[0];
};

// Update a user.
const updateUser = async (id, userData) => {
    const fieldMap = {
        name: "name",
        email: "email",
        phone: "phone",
        passwordHash: "password_hash",
        avatarUrl: "avatar_url",
        bio: "bio",
        country: "country",
        timezone: "timezone",
        language: "language",
    };

    const updates = [];
    const values = [];
    let parameterIndex = 1;

    for (const [field, column] of Object.entries(fieldMap)) {
        if (userData[field] !== undefined) {
            updates.push(`${column} = $${parameterIndex}`);
            values.push(userData[field]);
            parameterIndex++;
        }
    }

    // Nothing to update → return the current user.
    if (updates.length === 0) {
        return getUserById(id);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await query(
        `
        UPDATE users
        SET ${updates.join(", ")}
        WHERE id = $${parameterIndex}
        RETURNING
            id,
            name,
            email,
            phone,
            avatar_url AS "avatarUrl",
            bio,
            country,
            timezone,
            language,
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

// Delete a user.
const deleteUser = async (id) => {
    const result = await query(
        `
        DELETE FROM users
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    return result.rows.length > 0;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};