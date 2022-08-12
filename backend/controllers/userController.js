const User = require("../models/User");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const SECRET_KEY=process.env.SECRET_KEY;

//user register
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ msg: "Please enter all fields" });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ msg: "User already exists" });
      } else {
        // Create salt and hash
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({ name: name, email: email, password: hash });
        //saving data to the database and sending user data as json
        const data = await newUser.save();
        res.json(data);
      }
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (user) {
      await bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          const token = sign(
            {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            SECRET_KEY
          );
          res.json({
            message: "success",
            token,
            user,
          });
        } else {
          res.json({ err: "Given Credentials doesn't match" });
        }
      });
    } else {
      res.json({ err: "Given Credentials doesn't match" });
    }
  } catch (err) {
    res.json(err);
  }
};

//verify user
const getUser = async (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json({ error: "error" });
    }
  } catch (err) {
    console.log(err);
  }
};

//update user profile
const updateUser = async (req, res) => {
  try {
    console.log(req.body.values);
    const { name, email } = req.body.values;
    if (req.body.values._id.match(/^[0-9a-fA-F]{24}$/)) {
      await User.findByIdAndUpdate(
        {
          _id: req.body.values._id,
        },
        {
          name: name,
          email: email,
        }
      );

      res.json({ success: true });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//change password
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body.values;

    const user = await User.findById({ _id: req.body.values.id }).select(
      "+password"
    );
    if (user) {
      await bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if (match) {
          if (oldPassword === newPassword) {
            return res.json({
              success: false,
              error: "New Password cannot be old Password",
            });
          }
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(newPassword, salt);
          await User.findByIdAndUpdate(
            { _id: req.body.values.id },
            {
              password: hash,
            }
          );
          res.json({ success: true });
        } else {
          res.json({ success: false, error: "Enter Correct Password" });
        }
      });
    } else {
      res.json({ success: false, error: "Enter Correct Password" });
    }
  } catch (error) {
    res.json({ success: false, error: "Enter Correct Password" });
  }
};

//forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body.values;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      //user exists and create a one time link valid for 2 minutes
    } else {
      res.json({ success: false, error: "NO SUCH USER EXISTS" });
    }
  } catch (error) {
    res.json({ success: false, error: "" });
  }
};

module.exports = {
  signup,
  login,
  getUser,
  updateUser,
  changePassword,
  forgotPassword,
};
