const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    //req.body -> gan input nguoi dung dien vao
    const user = await User.create(req.body);
    console.log(user, "user db");
    const token = jwt.sign({ userID: user._id }, process.env.APP_SECRET);
    res.status(200).json({
      status: "success",
      data: { token, userName: user.name },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user, "user db");
    if (!user) {
      // Error: email is not correct
      const err = new Error("Gmail is not correct");
      err.statusCode = 400;
      return next(err);
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userID: user._id }, process.env.APP_SECRET);
      res.status(200).json({
        status: "success",
        data: { token, userName: user.name },
      });
    } else {
      // Error: password is not correct
      const err = new Error("Password is not correct");
      err.statusCode = 400;
      return next(err);
    }
  } catch (error) {
    res.json(error);
  }
};

// Get current user
exports.getCurrentUser = async (req, res, next) => {
  try {
    const data = { user: null };
    console.log(req.user, 'aaaaa')
    if (req.user) {
      const user = await User.findOne({_id: req.user.userID});
      console.log(user, 'aaaaa')

      data.user = { userName: user.name };
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.json(error);
  }
};
