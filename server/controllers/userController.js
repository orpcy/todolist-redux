const User = require("../models/userModel");

module.exports.addUser = (req, res) => {
  User.create(req.body, (err, data) => {
    if (err) {
      res.status(404).json("Email already exists!");
    } else {
      res.status(202).json(data);
    }
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, data) => {
    if (err) throw err;
    if (data) {
      if (data.password !== password.toString()) {
        res.status(400).json("incorrect password, please try again!");
      } else {
        res.status(202).json(data);
      }
    } else {
      res.status(404).json("user account does not exist!");
    }
  });
};
