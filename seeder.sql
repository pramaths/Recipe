-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipes Table
CREATE TABLE IF NOT EXISTS Recipes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    cooking_time INT NOT NULL,
    difficulty_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ratings Table
CREATE TABLE IF NOT EXISTS Ratings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    recipe_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- User Favorites Table
CREATE TABLE IF NOT EXISTS UserFavorites (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    recipe_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(id)
);

-- Seed Data for Users
INSERT INTO Users (username, email, password_hash) VALUES
('User1', 'user1@example.com', 'hash1'),
('User2', 'user2@example.com', 'hash2');

-- Seed Data for Recipes
INSERT INTO Recipes (title, ingredients, instructions, cooking_time, difficulty_level) VALUES
('Spaghetti Carbonara', 'Pasta, Eggs, Bacon, Parmesan Cheese', '1. Cook pasta. 2. Cook bacon. 3. Mix eggs and cheese. 4. Combine all with pasta.', 20, 'Easy'),
('Classic Ratatouille', 'Eggplant, Zucchini, Tomato, Bell Peppers', '1. Sauté vegetables separately. 2. Layer vegetables in a dish. 3. Bake.', 60, 'Medium');

-- Seed Data for Ratings
INSERT INTO Ratings (recipe_id, user_id, rating) VALUES
(1, 1, 4.5),
(2, 2, 5.0);

-- Seed Data for User Favorites
INSERT INTO UserFavorites (user_id, recipe_id) VALUES
(1, 1),
(2, 2);
