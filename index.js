require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");

const db = require("./db"); // Import MySQL connection pool
const PORT = process.env.PORT || 5000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public', {
  etag: false,
  lastModified: false,
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  }
}));

// Login Endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request:", req.body);

    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.json({ user: false });
    }
    if (user.password === password) {
      return res.json({
        login: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      return res.json({ password: false });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Sign Up Endpoint
app.post("/sign", async (req, res) => {
  try {
    let { name, email, password, confpassword, phoneNumber } = req.body;
    console.log("Signup request:", req.body);

    // Ensure phone number is in E.164 format
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = `+91${phoneNumber}`; // Assuming India; adjust as needed
    }

    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      console.log("User already exists");
      return res.json({ exist: true });
    }

    await db.execute(
      'INSERT INTO users (name, email, password, phoneNumber) VALUES (?, ?, ?, ?)',
      [name, email, password, phoneNumber]
    );

    return res.status(201).json({ message: "User Signed Up Successfully" });
  } catch (error) {
    console.error("Error in /sign:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Existing Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on ${BACKEND_URL}`);
});