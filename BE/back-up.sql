CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    user_headline VARCHAR(100)
);


INSERT INTO users (username, email) VALUES
('user1', 'user1@example.com');