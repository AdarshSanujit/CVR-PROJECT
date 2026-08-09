import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
dotenv.config();


const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the CVR API',
  });
});
app.use('/api/auth', authRoutes);

export default app;