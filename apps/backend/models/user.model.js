const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Email format validation
    },
    registrationNumber: {
      type: Number,
      unique: true,
      required: [true, "Enter registration number"],
      validate: {
        validator: function (num) {
          return /^\d{10}$/.test(num.toString()); // Ensures registration number is exactly 10 digits
        },
        message: "Registration number must be exactly 10 digits",
      },
    },
    password: {
      type: String,
      required: [true, "Enter password"],
      // minLength: [6, "Password should be at least 8 characters"],
      // maxLength: [32, "Password should not exceed 32 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee", // Default role if none is provided
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
  role = "employee"
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

  if (!password) {
    throw new Error("Enter password");
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

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, salt);

  // const hashedpas = await bcrypt.hash(password, 12)

  const user = await this.create({
    firstname,
    lastname,
    email,
    registrationNumber,
    password: hashedPassword,
  });

  return user;
};

// login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled!");
  }

  // check if the email exists
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
