// modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// create token utils
const createToken = require("../utils/createToken");

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
  const { firstname, lastname, email, registrationNumber, password, role } =
    req.body;
  try {
    const user = await User.signup(
      firstname,
      lastname,
      email,
      registrationNumber,
      password,
      role
    );

    const token = createToken(user._id);
    res.status(CREATED).json({ email, token });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Login the user and get both user object and the token
    const { user, token } = await User.login(email, password);

    if (!token) {
      return res.status(NOT_FOUND).json({ message: "Token not found" });
    }

    // Send the user data and token in the response
    res.status(OK).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
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
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.status(OK).json({ message: "There are no users for now!" });
    }

    res.status(OK).json(users);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, registrationNumber, password, role } =
      req.body;

    let user = await User.findById(id);
    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    // Check uniqueness for email and registration number (excluding current user)
    const regnoexists = await User.findOne({
      registrationNumber,
      _id: { $ne: id },
    });
    const emailExists = await User.findOne({ email, _id: { $ne: id } });

    if (regnoexists) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "User with this registration number exists" });
    }

    if (emailExists) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "User with this email exists" });
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (registrationNumber) user.registrationNumber = registrationNumber;
    if (role) user.role = role;

    if (password) {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(OK).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(NOT_FOUND).json({ message: "User not found!" });
    }

    res.status(OK).json({ message: "Deleted sucessfully" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  Signup,
  login,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
