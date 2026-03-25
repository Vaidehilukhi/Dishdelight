const mysql = require('mysql2/promise');

async function setupDatabase() {
    try {
        // Connect to MySQL server (without database) to create database
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });

        await connection.query('CREATE DATABASE IF NOT EXISTS recipe_sharing');
        console.log('Database created or already exists.');

        await connection.end();

        // Connect to the database to create tables
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'recipe_sharing'
        });

        // Create Users table
        await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(20) NOT NULL UNIQUE,
        otp VARCHAR(10),
        otpExpires BIGINT,
        role VARCHAR(50) DEFAULT 'user'
      )
    `);

        // Attempt to add role column if it doesn't exist (for existing tables)
        try {
            await db.query("ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user'");
        } catch (err) {
            // Ignore error if column already exists
        }

        console.log('Users table created or updated.');

        // Create Recipes table
        await db.query(`
      CREATE TABLE IF NOT EXISTS recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        ingredients TEXT,
        instructions TEXT,
        image VARCHAR(255),
        userId INT,
        userName VARCHAR(255)
      )
    `);

        // Attempt to add userId and userName columns if they don't exist
        try {
            await db.query("ALTER TABLE recipes ADD COLUMN userId INT");
            await db.query("ALTER TABLE recipes ADD COLUMN userName VARCHAR(255)");
        } catch (err) {
            // Ignore error if columns already exist
        }

        console.log('Recipes table created or updated.');

        // Create Reviews table
        await db.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                recipeId INT NOT NULL,
                userId INT NOT NULL,
                userName VARCHAR(255),
                rating INT NOT NULL,
                comment TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (recipeId) REFERENCES recipes(id) ON DELETE CASCADE,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log('Reviews table created or already exists.');

        // Create Contact Messages table
        await db.query(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Contact Messages table created or already exists.');

        await db.end();
        console.log('Database setup complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error setting up database:', error);
        process.exit(1);
    }
}

setupDatabase();
