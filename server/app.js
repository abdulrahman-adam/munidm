


// *********************************

// > Done! The Stripe CLI is configured for Abdulrahman-adam with account id acct_1P0JrDCfWMwH7W9h

// Please note: this key will expire after 90 days, at which point you'll need to re-authenticate.

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config'; 
import connectDB, { sequelize } from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

// Routes
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import contactRouter from "./routes/contactRoute.js";

const app = express();
const port = process.env.PORT || 3000;

await connectDB();
// --- ADD THIS SECTION HERE ---
// This creates the 'Contacts' table if it doesn't exist
try {
    await sequelize.sync({ alter: true }); 
    console.log("✅ MySQL Tables Synchronized");
} catch (error) {
    console.error("❌ MySQL Sync Error:", error);
}
connectCloudinary();
// --- 1️⃣ Stripe Webhook (RAW body, no auth!) ---
app.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);



// 2. CORS (Must be before all other routes)
const allowedOrigins = ['http://localhost:5173',
    "http://zooolna.com",
    "https://zooolna.com",
    'http://www.zooolna.com',  // Add this
    'https://www.zooolna.com'  // Add this
];
app.use(cors({ 
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS Policy Error'), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'sellerToken']
}));

// 3. INFRASTRUCTURE (Cookies must be parsed before auth middleware runs)
app.use(cookieParser());
app.use(express.json({ limit: '100mb' })); 
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// 4. API ROUTES
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/contact', contactRouter);

app.get('/', (req, res) => res.send("API IS WORKING NOW"));

// Global Error Handler to catch "Layer" crashes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});