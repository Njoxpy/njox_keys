const { SERVER_ERROR } = require("../constants/apiResponse");

// create
const createOrder = async (req, res) => {
  try {
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.mesage });
  }
};

// read
// update
// delete
