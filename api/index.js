const express = require('express');
const routes = require('./routes');  // Import routes yang sudah didefinisikan

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// 🔥 Tambahkan ini untuk mengaktifkan CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // atau 'http://localhost:5173' untuk lebih aman
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Menangani permintaan ke root ('/')
app.get('/', (req, res) => {
  res.send('Welcome to the root');
});

// Gunakan routes untuk API
app.use('/api', routes);  // Semua route API akan diawali dengan /api

// Jalankan server di lokal
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server running on port ${port}`));

// Export app untuk Vercel
module.exports = app;
