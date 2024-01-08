const User = require('../models/userModel');

module.exports.login_get = (req, res) => {
  res.render("users/login", { title: "Login" });
};
module.exports.login_post = (req, res) => {};
module.exports.signup_get = (req, res) => {
  
  res.render("users/signup", { title: "Signup" });
};
module.exports.signup_post =  async(req, res) => {
    const {email , password,username} = req.body;
    // console.log(email,password);
    try{
        const user = await User.create({email,password,username});
    }catch(err){

    }
};
