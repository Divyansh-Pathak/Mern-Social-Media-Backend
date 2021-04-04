const express = require("express");
const router = express.Router();

const {
    addUser,
  } = require("../routeHandlers/userHandler");

router.post("/user/add", addUser);
// router.get("/user/delete", deleteUser);
// router.get('/user/edit', editUser);

router.get('/', (req, res) => {
  res.send("Express is running");
});

router.get('/user/add', (req, res, next) => {

  // const form = '<h1>Register Page</h1><form method="post" action="register">\
  //                 Enter Username:<br><input type="text" name="uname">\
  //                 <br>Enter Password:<br><input type="password" name="pw">\
  //                 <br><br><input type="submit" value="Submit"></form>';

  const form = "Aake Dekh le server me jhaak le kuch nhi milega";

  res.send(form);
  
});

module.exports = router;
