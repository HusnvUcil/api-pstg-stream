const express = require('express');
const routes = require('./routes');  // Import routes yang sudah didefinisikan

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

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
