const mongoose = require("mongoose");
const { NOT_FOUND } = require("../../constants/apiResponse");

const validateObjectId = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(NOT_FOUND).json({ message: "Venue not found" });
  }

  // next middleware
  next();
};

module.exports = validateObjectId;
