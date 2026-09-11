CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE,

    phone VARCHAR(20) UNIQUE,

    password_hash TEXT,

    avatar_url TEXT,

    bio TEXT,

    country VARCHAR(100),

    timezone VARCHAR(50),

    language VARCHAR(10),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);