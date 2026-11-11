import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',  // או סיסמת ה-MySQL שלך
  database: 'classicmodels',
});

// נתיב עבור question1 - ספירת לקוחות מצרפת
app.get('/question1', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS total FROM customers WHERE country = 'France';");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// נתיב עבור question2 - שליפת פרטי לקוח מספר 1143 (הוספנו פסיק ותיקנו את השגיאה)
app.get('/question2', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT customerName, customerNumber FROM customers WHERE customerNumber = 1143;"); 
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// נתיב עבור question3 - ספירת מוצרים ב-Classic Cars
app.get('/question3', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS total FROM products WHERE productLine = 'Classic Cars';");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});