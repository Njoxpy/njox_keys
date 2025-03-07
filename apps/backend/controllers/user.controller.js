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

    // Check if any critical fields are empty
    if (firstname && firstname.trim() === "") {
      return res.status(400).json({ message: "First name cannot be empty!" });
    }

    if (lastname && lastname.trim() === "") {
      return res.status(400).json({ message: "Last name cannot be empty!" });
    }

    if (email && email.trim() === "") {
      return res.status(400).json({ message: "Email cannot be empty!" });
    }

    if (registrationNumber && registrationNumber.trim() === "") {
      return res
        .status(400)
        .json({ message: "Registration number cannot be empty!" });
    }

    // Check if the updated email or registration number already exists (excluding the current user)
    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists!" });
      }
    }

    if (registrationNumber) {
      const regNumberExists = await User.findOne({
        registrationNumber,
        _id: { $ne: id },
      });
      if (regNumberExists) {
        return res
          .status(400)
          .json({ message: "Registration number already exists!" });
      }
    }

    // Update the user with the provided details
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully!",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
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
