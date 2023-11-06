const User = require("../../../pkg/user/userSchema");
// npm i jsonwebtoken
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

exports.signup = async (req, res) => {
  try {
    console.log(req);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; //destrukturiranje
    //ova e isto kako ova podole
    // const email = req.body.email;
    // const password = req.body.password;

    //proveruvame dali ima vneseno email i password
    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }
    // Proveruvame dali userot e vo nasata databaza, odnosno dali ima account
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    // Sporeduvame passwords
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password");
    }
    //generirame i isprakjame token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    //isprakjame response
    res.status(201).json({ status: "success", token });
  } catch (err) {
    res.status(500).send(err);
  }
};
