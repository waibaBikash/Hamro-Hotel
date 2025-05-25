import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import bookingRouter from './routes/bookingRoutes.js';



connectDB(); // Connect to MongoDB
connectCloudinary(); // Connect to Cloudinary

const app = express();
app.use(cors()); // Enable CORS for all routes

// Middleware 
app.use(express.json()); // Parse JSON request bodies
app.use(clerkMiddleware())


// API to listen to Clerk webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => 
    res.send('API is running'));
app.use('/api/user', userRouter); // User routes
app.use('/api/hotels', hotelRouter )
app.use('/api/bookings', bookingRouter); // Booking routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);