require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const maxAge = 1 * 60 * 60 * 24 * 3; // 3 days in seconds

const handleError = function (err) {
  let errors = { email: "", password: "", username: "" };

  // login errors......
  if (err.message === "email not registered") {
    errors.email = err.message;
    return errors;
  } else if (err.message === "password incorrect") {
    errors.password = err.message;
    return errors;
  }

  //signup error
  // validation errors
  // console.log(err.code,err.keyPattern,err.message.includes("email"));
  // console.log(err);
  if (err.code === 11000) {
    if (err.message.includes("email")) {
      errors.email = "email already used";
    } else {
      errors.username = "username already used";
    }
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });

    return errors;
  }
};

const createToken = function (id) {
  return jwt.sign({ id }, secretKey, {
    expiresIn: maxAge,
  });
};

module.exports.login_get = (req, res) => {
  res.render("users/login", { title: "Login" });
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.signup_get = (req, res) => {
  res.render("users/signup", { title: "Signup" });
};
module.exports.signup_post = async (req, res) => {
  const { email, password, username } = req.body;
  // console.log(email,password);
  try {
    const user = await User.create({ username, email, password });

    // jwt cookie create
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
    // send cookie
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
