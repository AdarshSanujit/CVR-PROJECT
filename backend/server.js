import app from './src/app.js'
import connectDB from './src/db/db.js';
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})