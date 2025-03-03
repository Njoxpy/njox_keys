const express = require("express");
const cors = require("cors");
const compression = require("compression");
require("dotenv").config();
const connectDB = require("./config/dbConfig");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression());

// routes export
const venueRoutes = require("./routes/venue.routes");
const statsRoutes = require("./routes/stats.routes");
const statusRouter = require("./routes/status.routes");
const orderRoutes = require("./routes/orders.routes");

// register routes
app.use("/api/v1/venues", venueRoutes);

// stats
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/status", statusRouter);
app.use("/api/v1/orders", orderRoutes);

// not found route
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

const startServer = async () => {
  try {
    await connectDB();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port http://localhost:${port}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(
        `📊 Database: ${process.env.MONGO_URI ? "Connected" : "Not Configured"}`
      );
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
