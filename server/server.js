import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'



connectDB(); // Connect to MongoDB

const app = express();
app.use(cors()); // Enable CORS for all routes

// Middleware 
app.use(express.json()); // Parse JSON request bodies
app.use(clerkMiddleware())

app.get('/', (req, res) => 
    res.send('API is running'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);