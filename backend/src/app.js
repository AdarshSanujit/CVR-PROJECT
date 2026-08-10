import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import projectRoutes from './routes/project.route.js';

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
app.use('/api/project', projectRoutes);

app.use((req, res, next) => {
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});


export default app;