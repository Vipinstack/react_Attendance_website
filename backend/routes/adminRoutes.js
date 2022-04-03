const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const seceret = "SS^^^^^^^^^^^@@%$dskbm";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const adminModel = require("../db/adminModel");

router.post("/login", (req, res) => {
  //read values
  let post = req.body.post;
  let email = req.body.email;
  let password = req.body.password;

  adminModel.findOne({ email: email }, (err, data) => {
    if (err) {
      res.status(404).json({ err: 1, msg: "something is wrong" });
    } else if (data == null) {
      res.status(401).json({ err: 1, msg: "fill the data" });
    } else {
      if (bcrypt.compareSync(password, data.password)) {
        const payload = { post };
        const token = jwt.sign(payload, seceret, {
          expiresIn: "1h",
        });

        res.status(200).json({ err: 0, msg: "Login Success..", token: token });
      } else {
        res
          .status(401)
          .json({ err: 1, msg: "Email or Password is not Correct" });
      }
    }
  });

  // // insert data
  // const hashPassword = bcrypt.hashSync(password, saltRounds);
  // let ins= new adminModel({post:post,email:email, password:hashPassword});

  // ins.save(err => {
  //     if(err){
  //         res.json({'err':1, 'msg':'something is wrong'})
  //     }
  //     else{
  //         res.json({'err':0, 'msg':'Register'})
  //     }
  // })
});

module.exports = router;
