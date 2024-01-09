const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secretKey = process.env.SECRET_KEY;


const authUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        // console.log('andr hai bhaiya');
        res.locals.user = null;
      return res.redirect("/user/login");
    } else {
      jwt.verify(token, secretKey, (err, Data) => {
        if (err) {
          return res.redirect("/user/login");
        } else {
          next();
        }
      });
    }
  };
  
  // check which user is loged in
  const checkUser = (req, res, next) => {
    res.locals.user = null;
    const token = req.cookies.jwt;
    if (!token) {
      res.locals.user = null;
      return next();
    } else {
      jwt.verify(token, secretKey,async (err, Data) => {
        if (err) {
          // res.redirect("/user/login");
          res.locals.user = null;
          return next();
        } else {
          const user = await User.findById(Data.id);
          res.locals.user = user;
          return next();
        }
      });
    }
  };

module.exports = { authUser, checkUser };