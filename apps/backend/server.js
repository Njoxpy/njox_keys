const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rfs = require("rotating-file-stream");
require("dotenv").config();

// connect DB
const connectDB = require("./config/dbConfig");

// logger
const logger = require("./logs/logger");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());

// routes export
const venueRoutes = require("./routes/venue.routes");
const statsRoutes = require("./routes/stats.routes");
const statusRouter = require("./routes/status.routes");
const orderRoutes = require("./routes/orders.routes");
const userRoutes = require("./routes/user.routes");
const studentRoutes = require("./routes/students.routes");
const reportRoutes = require("./routes/reports.routes");

// register routes
app.use("/api/v1/venues", venueRoutes);

// stats
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/status", statusRouter);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/reports", reportRoutes);

// uploads folder - serve static files with proper CORS headers
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"), {
    setHeaders: (res, path, stat) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin"); // Allow frontend to load images
    },
  })
);


var accessLogStream = rfs.createStream("accessMorgan.log", {
  interval: "1d",
  path: path.join(__dirname, "logs/morgan"),
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

// not found route
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

app.use((req, res, next) => {
  logger.info("Incoming request", {
    method: req.method,
    url: req.url,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });
  next();
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
