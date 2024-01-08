const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: [isEmail,"email should be a valid email"],
  },
  password: {
    type: String,
    required: [true,"password is required"],
    minLength: [6,"password should be atleast 6 characters long"],
  },
  username: {
    type: String,
    required: [true,"username is required"],
    unique: true,
    minLength: [1,"username can not be empty"],
  },
});

//mongoose hooks
userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

// //static method
// userSchema.statics.login = async function(email,password){

// }

const User = mongoose.model('User',userSchema);

module.exports=User;