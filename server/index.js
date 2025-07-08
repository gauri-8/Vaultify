import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import achievementRoutes from './routes/achievementRoutes.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import askVaultRoutes from './routes/askVaultRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;


// Middleware
// With this:
app.use(cors({
  origin: ['http://localhost:5173', 'https://vaultify-frontend.onrender.com'], // include both local + deployed frontend
  credentials: true,
}));

app.options('*', cors()); // Enable preflight across all routes
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  res.send('🚀 Vaultify Backend is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/achievements', achievementRoutes);
app.use('/user', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/askvault', askVaultRoutes);

// DB Connect + Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

startServer();
