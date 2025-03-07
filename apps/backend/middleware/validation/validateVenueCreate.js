const { BAD_REQUEST } = require("../../constants/apiResponse");

const mongoose = require("mongoose");

const validateVenueCreate = async (req, res, next) => {
  const {
    abbreviation,
    block,
    capacity,
    description,
    equipment,
    name,
    venueNumber,
  } = req.body;

  // get user is from userId
  if (
    !abbreviation ||
    !block ||
    !capacity ||
    !description ||
    !equipment ||
    !name ||
    !venueNumber
  ) {
    return res.status(BAD_REQUEST).json({
      message:
        "All fields are required, venue info abbreviation, block, capacity, description, equipment and venueNumber, name",
    });
  }

  // const userId = req.user && req.user._id;

  const parsedCapacity = Number(capacity);
  if (isNaN(parsedCapacity)) {
    return res.status(BAD_REQUEST).json({ message: "Enter valid capacity!" });
  }

  const parsedVenueNumber = Number(venueNumber);

  if (isNaN(parsedVenueNumber)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Enter valid venue number!" });
  }

  if (parsedCapacity <= 0) {
    return res.status(BAD_REQUEST).json({
      message: "Enter valid capacity!, capacity should be greater than zero!",
    });
  }

  /* if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(BAD_REQUEST).json({ message: "Invalid user ID" });
  } */

  if (description.length > 500) {
    return res.status(BAD_REQUEST).json({
      message: "Description should not be greater than 500 characters",
    });
  }

  if (block.length > 100) {
    return res.status(BAD_REQUEST).json({
      message: "Block should not be greater than 100 characters",
    });
  }

  if (abbreviation.length > 20) {
    return res.status(BAD_REQUEST).json({
      message: "Abbreviation should not be more than 20 characters",
    });
  }

  if (name.length < 2 || name.trim() === "") {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Name should be at least 2 characters and not empty" });
  }

  next();
};

module.exports = validateVenueCreate;
