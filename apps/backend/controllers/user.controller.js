// modules
const bcrypt = require("bcryptjs");

// status code
const {
  SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  OK,
} = require("../constants/apiResponse");

// user model
const User = require("../models/user.model");

const Signup = async (req, res) => {
  try {
    const { firstname, lastname, email, registrationNumber, password, role } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    // check if email exist
    const exists = await User.findOne({
      $or: [{ email }, { registrationNumber }],
    });

    if (exists) {
      return res.status(BAD_REQUEST).json({
        message:
          "User already exist!, use different email or regstration number",
      });
    }

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      registrationNumber,
      password: hashedPassword,
      role,
    });

    res.status(CREATED).json({ message: "User created sucessfully", newUser });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found!" });
    }

    res.status(OK).json(user);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get user", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    if (users.length === 0) {
      return res
        .status(NOT_FOUND)
        .json({ message: "There are no users for now!" });
    }

    res.status(OK).json(users);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get users!", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, registrationNumber, password, role } =
      req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { new: true },
      { ...req.body }
    );

    // check if regstation number exists and email exists for the update user: if yes return error

    if (!updatedUser) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    res.status(OK).json({ message: "Updated sucessfully!" });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to update user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(NOT_FOUND).json({ message: "User not found!" });
    }

    res.status(OK).json({ message: "Deleted sucessfully", deletedUser });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to delete user", error: error.message });
  }
};
module.exports = {
  Signup,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
