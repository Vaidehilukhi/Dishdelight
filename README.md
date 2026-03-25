# ⚡ Quick Setup Guide — Recipe Sharing Platform

## 1. Install Dependencies
```bash
npm install
```

## 2. Start MySQL
- Open **XAMPP** and start the **MySQL** service.
- In phpMyAdmin, create a database named `recipe_sharing`.
- Import the schema:
```bash
mysql -u root -p recipe_sharing < recipe_sharing.sql
```

## 3. Create `.env` file
```env
PORT=5000
BACKEND_URL=http://localhost:5000
```

## 4. Run the Server
```bash
npm run dev       # development
npm start         # production
```

## 5. Open in Browser
```
http://localhost:5000
```

---
✅ That's it! Register an account and start adding recipes.
