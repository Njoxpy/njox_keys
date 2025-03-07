const { BAD_REQUEST } = require("../../constants/apiResponse");

const validateUserCreate = (req, res, next) => {
  const { firstname, lastname, email, registrationNumber, password, role } =
    req.body;

  // Check if all required fields are present
  if (!firstname || !lastname || !email || !registrationNumber || !password) {
    return res.status(BAD_REQUEST).json({
      message:
        "All fields are required: firstname, lastname, email, registrationNumber, password, role",
    });
  }

  // Validate firstname and lastname lengths
  if (firstname.length < 2 || firstname.length > 35) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "First name should be between 2 and 35 characters" });
  }

  if (lastname.length < 2 || lastname.length > 35) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Last name should be between 2 and 35 characters" });
  }

  // Validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(BAD_REQUEST).json({ message: "Invalid email format" });
  }

  // Validate password length

  // Validate role
  if (!["admin", "employee"].includes(role)) {
    return res.status(BAD_REQUEST).json({
      message: "Invalid role! Role should either be 'admin' or 'employee'",
    });
  }

  // Validate registration number (should be a number and exactly 10 digits)
  if (
    typeof registrationNumber !== "number" ||
    !/^\d{10}$/.test(registrationNumber.toString())
  ) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Registration number must be exactly 10 digits" });
  }

  next(); // If all validations pass, proceed to the next middleware
};

module.exports = validateUserCreate;
