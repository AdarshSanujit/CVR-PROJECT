import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import projectRoutes from './routes/project.route.js';

dotenv.config();


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "API working",
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