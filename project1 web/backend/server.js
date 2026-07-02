const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
// const connectDB = require('./config/db'); // Vaqtincha o'chirilgan

// ENV
dotenv.config(); // Atrof-muhit o'zgaruvchilari faollashtirildi

// MongoDB
// connectDB(); // Vaqtincha o'chirilgan

const app = express(); // To'g'rilandi (Ochib qo'yildi)

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

// Main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check (Render uchun foydali)
app.get('/health', (req, res) => {
  res.send('OK');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
});
