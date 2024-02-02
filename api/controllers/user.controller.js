const UserModel = require("../models/user-model");

exports.getUsers = async (req, res, next) => {
  UserModel.find()
    .then((data) => {
      console.log("data ", data);
      res.json({ users: data });
    })
    .catch(() => {
      console.log("Error fetching user");
    });
};
