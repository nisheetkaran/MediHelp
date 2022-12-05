const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "medihelp");

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  console.log("haha");
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login!");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  //   if (password != user.password) {
  if (!isMatch) {
    console.log("failed");
    throw new Error("Unable to login!");
  } else {
    console.log("success");
  }
  return user;
};

const User = mongoose.model("mytable", userSchema);
// module.exports = mongoose.model("mytable", user);
module.exports = User;
