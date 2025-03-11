const { BAD_REQUEST } = require("../../constants/apiResponse");

const validateStudentCreate = async (req, res, next) => {
  const { registrationNumber, yearOfStudy } = req.body;

  //   validate request
  if (!registrationNumber) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Registration number is required" });
  }

  if (!yearOfStudy) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Year of study is required" });
  }

  if (!/^\d{14}$/.test(registrationNumber.toString())) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Registration number must be exactly 14 digits" });
  }

  if (typeof registrationNumber !== "number" || isNaN(registrationNumber)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Registration number must be a number" });
  }

  next();
};

module.exports = validateStudentCreate;
