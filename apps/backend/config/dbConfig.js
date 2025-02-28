const mongose = require("mongoose");

const connectDB = async () => {
  try {
    mongose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("failed to connect to database", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
