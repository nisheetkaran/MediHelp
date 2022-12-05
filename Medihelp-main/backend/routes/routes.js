const express = require("express");
const router = express.Router();
const user = require("../models/signUpModels");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);
  const newuser = new user({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: securePassword,
  });
  try {
    await newuser.save();
    // const token = await newuser.generateAuthToken();
    // res.status(201).send({member,token})

    // res.cookie("jwtoken", token, {
    //   expires: new Date(Date.now() + 25892000000),
    //   httpOnly: true,
    // });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (request, response) => {
  try {
    const email = request.body.email;
    const password = request.body.password;
    console.log(email);
    console.log(password);
    // const saltPassword = await bcrypt.genSalt(10);
    // const securePassword = await bcrypt.hash(
    //   request.body.password,
    //   saltPassword
    // );
    const userfind = await user.findByCredentials(email, password);

    console.log(userfind);
    if (userfind) {
      console.log("hehe");
      response.json({ message: "user signed in " });
    } else {
      response.status(400).json({ error: "Invalid cred" });
    }
  } catch (e) {
    console.log("error");
  }
});

module.exports = router;
