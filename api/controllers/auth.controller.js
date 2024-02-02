const UserModel = require("../models/user-model");
const TokenModel = require("../models/user-token-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.signUp = async (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const userModel = new UserModel({
      email: req.body.email,
      password: hash,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    });

    userModel
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
};

exports.login = async (req, res) => {
  let userFound;

  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }
      userFound = user;
      console.log("userFound ", userFound);
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Password is incorrect",
        });
      }

      const token = jwt.sign(
        { email: userFound.email, userId: userFound._id, user: userFound },
        "secret_string",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        token: token,
        expiresIn: 3600,
        user_id: userFound._id,
        user: userFound,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Error with authentication",
      });
    });
};

exports.resetPassword = async (req, res, next) => {
  console.log("in reset-pass");
  const token = req.body.token;
  const newPassword = req.body.password;

  jwt.verify(token, "secret_string", async (err, data) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      const response = data;
      console.log("response ", response);

      UserModel.findOne({ email: response.email })
        .then((user) => {
          if (!user) {
            return res.status(401).json({
              message: "User not found",
            });
          }
          const userFound = user;
          console.log("userFound ", userFound);
          bcrypt.hash(newPassword, 10).then((hash) => {
            userFound.password = hash;

            UserModel.findOneAndUpdate(
              { _id: userFound._id },
              { $set: userFound },
              { new: true }
            )
              .then((result) => {
                res.status(201).json({
                  message: "Reset password success",
                  result: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          });
        })
        .catch((err) => {
          return res.status(401).json({
            message: "Error with reset password",
          });
        });
    }
  });
};

exports.sendEmail = async (req, res, next) => {
  console.log("in server sendEmail post");
  const email = req.body.email;

  let userFound;

  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }
      userFound = user;
      console.log("userFound ", userFound);
      const payload = {
        email: userFound.email,
      };

      const expireTime = 300;
      const token = jwt.sign(payload, "secret_string", {
        expiresIn: expireTime,
      });

      console.log("token before", token);

      const newToken = new TokenModel({
        user_id: userFound._id,
        token: token,
      });

      const urlToken = token.toString().replace(/\./g, ",");

      console.log("urlToken", urlToken);

      const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "aprilrjwilliams@gmail.com",
          pass: "osvuahpzzbzbaaxo",
        },
      });

      const mailDetails = {
        from: "aprilrjwilliams@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `
          <html>
          <head>
            <title>Password Reset Request</title>
          </head>
          <body>
            <h1>Password Reset Request</h1>
            <p>Dear ${userFound.firstname},</p>
            <p>We received a request to reset your password for your account with Pin High. To complete the password reset process, please click on the button below:</p>
            <a href="http://localhost:4200/reset/${urlToken}"><button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none; cursor:pointer; border-radius: 4px;">Reset Password</button></a>
            <p>Please note that this link is only valid for 5 minutes. If you did not request a password reset please disregard this message.</p>
            <p>Thank you,</p>
            <p>Pin Hign Team</p>
          </body>
          </html>
          `,
      };

      mailTransporter.sendMail(mailDetails, async (err, data) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          await newToken
            .save()
            .then((result) => {
              res.status(200).json({
                message: "Email sent",
                result: result,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Error with forgot password",
      });
    });
};
