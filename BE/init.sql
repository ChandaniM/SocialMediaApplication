-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    profile_url VARCHAR(100),
    user_headline VARCHAR(100)
);

-- Insert initial data into the users table
INSERT INTO users (username, email) VALUES
('user1', 'user1@example.com');

-- Create the user_posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    post_content TEXT,
    media_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes_count INTEGER DEFAULT 0,
    images  VARCHAR(50),
    CONSTRAINT user_posts_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Create the comments table if it doesn't exist
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    status VARCHAR(50) DEFAULT 'active',
    CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id)
        REFERENCES user_posts (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Optional: Set the table owner to postgres
ALTER TABLE IF EXISTS comments
    OWNER TO postgres;
