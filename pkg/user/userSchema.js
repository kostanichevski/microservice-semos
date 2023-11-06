const mongoose = require("mongoose");
// npm i validator(za validacija), npm i bcryptjs (za kriptiranje)
const validator = require("validator");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true, // site bukvi moraat da se mali
    unique: true, //sekoj da e unikaten
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Password must be at least 4 characters long"],
    // validate: [validator.isStrongPassword, "Please provide a strong password"],
    // ne go koristime vo test faza no e pozalno da se koristi vo realna aplikacija za da se dodavaat dodatni karakteri vo pasvordot osven samo bukvi na pr.
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  // ako pasvordot ne e promenet, da si odi na sledno
  if (!this.isModified("password")) {
    return next();
  } else {
    //dodeka pasvordot se promeni ili ako imame nov pasvord, izvrsuvame kriptiranje na samiot pasvord so jacina 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// this
// nasocuva kon objektot
