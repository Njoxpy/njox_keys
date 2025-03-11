const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Enter first name"],
      minLength: [2, "First name should be at least 2 characters"],
      maxLength: [35, "First name should not exceed 35 characters"],
      trim: [true, "Enter valid first name!"],
    },
    lastname: {
      type: String,
      required: [true, "Enter last name"],
      minLength: [2, "Last name should be at least 2 characters"],
      maxLength: [35, "Last name should not exceed 35 characters"],
      trim: [true, "Enter valid last name!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Enter email"],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    registrationNumber: {
      type: Number,
      unique: true,
      required: [true, "Enter registration number"],
      validate: {
        validator: function (num) {
          return /^\d{10}$/.test(num.toString());
        },
        message: "Registration number must be exactly 10 digits",
      },
    },
    password: {
      type: String,
      required: [true, "Enter password"],
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
    },
  },
  { timestamps: true }
);

// signup
userSchema.statics.signup = async function (
  firstname,
  lastname,
  email,
  registrationNumber,
  password,
  role
) {
  // check if the email and reg no exists

  const emalExists = await this.findOne({ email });
  const registrationNumberExists = await this.findOne({ registrationNumber });

  // validate field
  if (!firstname || typeof firstname !== "string") {
    throw new Error("Enter firstname and should a character");
  }

  if (!lastname) {
    throw new Error("Enter lastname and should a character");
  }

  if (!email) {
    throw new Error("Enter email");
  }

  if (!registrationNumber || typeof registrationNumber !== "number") {
    throw new Error("Enter valid regstration number");
  }

  if (
    !password ||
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password must be at least 8 characters long, with at least one lowercase letter, one uppercase letter, one number, and one special character."
    );
  }

  if (!role || !["admin", "employee"].includes(role)) {
    throw new Error("Enter a valid role");
  }

  if (emalExists) {
    throw new Error("Email already exists");
  }

  if (registrationNumberExists) {
    throw new Error("Regstration number exists");
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstname,
    lastname,
    email,
    registrationNumber,
    password: hashedPassword,
    role,
  });

  return user;
};

// login

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled!");
  }

  // Check if the email exists
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  // Check if the password matches
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  return { user, token };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
