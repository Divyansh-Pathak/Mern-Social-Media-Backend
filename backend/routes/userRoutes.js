const express = require("express");
const router = express.Router();
const passport = require('passport');
const {validateUserDetails}= require("../Middlewares/validationMiddleware");
const {
  addUser,
  sendUser,
  editUser
} = require("../routeHandlers/userHandler");


router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }));

router.post('/register', addUser);

router.post('/editProfile', validateUserDetails, editUser);

router.get('/logout', function (req, res) {
  req.logout();
  res.send("Logout Hogya");
});

router.get('/user', sendUser);

router.get('/', (req, res) => {
  res.send("Express is running");
});

router.get('/login-failure', (req, res) => {
  res.json({isLoggedIn: false});
});

router.get('/login-success', (req, res) => {
  res.json({isLoggedIn: true});
});


module.exports = router;
