const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db.js");
const userRoutes = require("./routers/user.route.js");
const productRoutes = require("./routers/product.route.js");
const errorHandler = require("./middleware/errorHandler.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const orderRoutes = require("./routers/order.route.js");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://hibuy.onrender.com",
    credentials: true,
  })
);

// Serve static files from the 'uploads' directory

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Serve the frontend (if applicable)
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Error Handler Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
