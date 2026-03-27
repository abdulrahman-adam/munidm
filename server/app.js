


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
const port = process.env.PORT || 6000;

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
// const allowedOrigins = ['http://localhost:5173',
//    'https://munidm.fr',
//   'https://www.munidm.fr',
//   'http://localhost:5173',
//   'http://109.176.199.234:5173'
// ];

// app.use(cors({ 
//     origin: function (origin, callback) {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             return callback(new Error('CORS Policy Error'), false);
//         }
//         return callback(null, true);
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'token', 'sellerToken']
// }));

// Add all versions of your domain here
const allowedOrigins = [
  'https://munidm.fr',
  'https://www.munidm.fr',
  'http://localhost:5173',
  'http://109.176.199.234:5173'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin); // This helps you debug in logs
      callback(new Error('CORS Policy Error'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
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

// git add .
// git commit -m "Final cleanup of server Dockerfile"
// git push origin main


// VPS
// # 1. Download the clean code from GitHub
// git fetch origin main

// # 2. Force the VPS to match your Laptop (Removes all errors)
// git reset --hard origin/main

// # 3. Rebuild the website with the new clean Dockerfiles
// docker compose up --build -d




// Rebuild the Docker container (since you changed a configuration file):
// cd /var/www/munidm
// docker compose down
// docker compose build --no-cache client
// docker compose up -d




// CREATE USER 'munidm'@'%' IDENTIFIED BY 'Munidm91!!!';
// GRANT ALL PRIVILEGES ON munidm_db.* TO 'munidm'@'%';
// FLUSH PRIVILEGES;