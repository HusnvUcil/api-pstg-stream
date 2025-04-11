const express = require('express');
const routes = require('./routes'); // Import routes dari routes.js

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan routes
app.use('/api', routes); // Semua route akan diawali dengan /api

// // Jalankan server di lokal
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server running on port ${port}`));

// Export app untuk Vercel
module.exports = app;