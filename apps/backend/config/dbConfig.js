const mongose = require("mongoose");

const connectDB = async () => {
  try {

    if (!process.env.MONGO_URI) {
      console.log("There is nto env variable for mongo uri...")

      process.exit(1)
    }
    mongose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("failed to connect to database", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
