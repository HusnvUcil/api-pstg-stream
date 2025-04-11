const { Pool } = require("pg");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // Hanya load .env di lokal
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Opsional, tergantung penyedia
});

// Test koneksi dan log jika berhasil
pool.connect((err, client, release) => {
  if (err) {
    console.error("Failed to connect to the database:", err.stack);
    return;
  }
  console.log("Database connection successful");
  release(); // Lepaskan client kembali ke pool
});

module.exports = pool;