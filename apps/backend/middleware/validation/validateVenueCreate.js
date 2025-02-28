const { BAD_REQUEST } = require("../../constants/apiResponse");

const validateVenueCreate = async (req, res, next) => {
  const {
    abbreviation,
    block,
    capacity,
    description,
    equipment,
    name,
    status,
  } = req.body;

  // validate
  if (
    !abbreviation ||
    !block ||
    !capacity ||
    !description ||
    !equipment ||
    !name ||
    !status
  ) {
    return res.status(BAD_REQUEST).json({ message: "All fields are required" });
  }

  // validate numbers(capacity)
  if (typeof capacity !== "number") {
    return res.status(BAD_REQUEST).json({ message: "Enter valid capacity!" });
  }

  if (capacity <= 0) {
    return res.status(BAD_REQUEST).json({
      message: "Enter valid capacity!, capacity should be greater than zero!",
    });
  }

  // validate length
  if (description.length > 500) {
    return res.status(BAD_REQUEST).json({
      message: "Description should not be greater than 500 characters",
    });
  }

  if (block.length > 100) {
    return res.status(BAD_REQUEST).json({
      message: "Block should not be greater than 20 characters",
    });
  }

  if (abbreviation.length > 20) {
    return res.status(BAD_REQUEST).json({
      message: "Abbreaviation should be short not be more than 20 characters",
    });
  }
  // validate status

  // name
  if (name.length < 2 || name === "" || name.trim === "") {
    return res.status(BAD_REQUEST).json({ message: "Name should be empty" });
  }

  next();
};

module.exports = validateVenueCreate;
