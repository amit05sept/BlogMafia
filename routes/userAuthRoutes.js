const express = require('express');
const userAuthRouteController = require('../controllers/userAuthRouteController');
const router = express.Router();

router.get('/signup',userAuthRouteController.signup_get);
router.post('/signup',userAuthRouteController.signup_post);
router.get('/login',userAuthRouteController.login_get);
router.post('/login',userAuthRouteController.login_post);

module.exports=router;