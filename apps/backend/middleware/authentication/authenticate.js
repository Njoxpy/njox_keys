const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

// Authentication middleware
const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded); // Debugging: Log the decoded token

    // Find the user by _id
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user information to the request object
    req.user = user;
    next();
  } catch (err) {
    // console.error("Token verification error:", err); // Log any errors during verification
    res.status(401).json({ error: "Invalid token" });
  }
};

// Role-based access middleware
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden. You don't have the required permissions.",
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
