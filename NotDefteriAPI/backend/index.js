// server.js
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');
const cors = require('cors');

const app = express();

// Use express.json() instead of bodyParser.json() (Express >= 4.16)
app.use(express.json());
app.use(cors());

// MongoDB Connection
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB bağlantısı başarılı!');
    })
    .catch((err) => {
        console.error('MongoDB bağlantı hatası:', err);
    });

// Use the note routes
app.use('/api', noteRoutes);

// Server setup
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
