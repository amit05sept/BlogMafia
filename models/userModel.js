const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: [isEmail, "email should be a valid email"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "password should be atleast 6 characters long"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    match: [/^[^\s]+$/, "username must not contain spaces"], // Regular expression to disallow spaces
    trim: true, // Remove leading and trailing whitespaces
    minLength: [3, "username can not be empty"],
    maxlength: [10, "username can only be 10 characters long"],
  },
});

//mongoose hooks
userSchema.pre("save", async function (next) {
  // change username to lowercase
  this.username = this.username.toLowerCase();

  // secure password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// //static method
userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw Error("email not registered");
  }
  // verify the password
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    throw Error("password incorrect");
  }
  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
