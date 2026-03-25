const express = require("express");
const router = express.Router();
const db = require("../db");

// POST: Add recipe
router.post("/", async (req, res) => {
  try {
    const { title, description, ingredients, instructions, image, userId, userName } = req.body;
    const [result] = await db.execute(
      'INSERT INTO recipes (title, description, ingredients, instructions, image, userId, userName) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, ingredients, instructions, image, userId, userName]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding recipe" });
  }
});

// GET: Fetch all recipes with average rating (optional filtering by userId)
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    let query = `
      SELECT r.*, COALESCE(AVG(rv.rating), 0) as averageRating, COUNT(rv.id) as reviewCount
      FROM recipes r
      LEFT JOIN reviews rv ON r.id = rv.recipeId
    `;

    const params = [];
    if (userId) {
      query += ' WHERE r.userId = ?';
      params.push(userId);
    }

    query += ' GROUP BY r.id';

    const [recipes] = await db.execute(query, params);
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

// GET: Search recipes
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const [recipes] = await db.execute(
      'SELECT * FROM recipes WHERE title LIKE ? OR description LIKE ?',
      [`%${q}%`, `%${q}%`]
    );
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching recipes" });
  }
});

// GET: Fetch single recipe
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
});

// PUT: Update recipe
router.put("/:id", async (req, res) => {
  try {
    const { title, description, ingredients, instructions, image, userId, role } = req.body;

    // Check ownership or admin role
    const [rows] = await db.execute('SELECT userId FROM recipes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Recipe not found" });

    const recipe = rows[0];
    if (recipe.userId !== userId && role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await db.execute(
      'UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, image = ? WHERE id = ?',
      [title, description, ingredients, instructions, image, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete recipe
router.delete("/:id", async (req, res) => {
  try {
    const { userId, role } = req.body; // Expecting userId and role in body for simplicity, ideally from token/session

    // Check ownership or admin role
    const [rows] = await db.execute('SELECT userId FROM recipes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Recipe not found" });

    const recipe = rows[0];
    // Note: If userId is null (legacy recipes), only admin can delete
    if (recipe.userId !== userId && role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await db.execute('DELETE FROM recipes WHERE id = ?', [req.params.id]);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST: Add review
router.post("/:id/reviews", async (req, res) => {
  try {
    const { userId, userName, rating, comment } = req.body;
    const recipeId = req.params.id;

    await db.execute(
      'INSERT INTO reviews (recipeId, userId, userName, rating, comment) VALUES (?, ?, ?, ?, ?)',
      [recipeId, userId, userName, rating, comment]
    );
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review" });
  }
});

// GET: Get reviews for a recipe
router.get("/:id/reviews", async (req, res) => {
  try {
    const [reviews] = await db.execute('SELECT * FROM reviews WHERE recipeId = ? ORDER BY createdAt DESC', [req.params.id]);
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

module.exports = router;
