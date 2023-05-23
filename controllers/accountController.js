import UserModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AccountController {
  static signup = async (req, res) => {
    console.log(req.body);
    const { username, password, name, rollNo, email } = req.body;
    var emailOrMobile = null;

    if (
      req.body["username"] &&
      req.body["password"] &&
      req.body["rollNo"] &&
      req.body["name"] &&
      req.body["email"]
    ) {
      // console.log("req.body", req.body);
      if (req.body["email"]) {
        emailOrMobile = req.body["email"].toLowerCase();
        const emailExists = await UserModel.findOne({ email: emailOrMobile });
        if (emailExists) {
          // return res.redirect("../signup", 400, {
          //   status: "failed",
          //   message: "Email already exists",
          // });

          return res.status(400).json({
            status: "failed",
            message: "Email already exists",
          });
        }
      }
      if (req.body["rollNo"]) {
        const mobileExists = await UserModel.findOne({ rollNo: rollNo });
        if (mobileExists) {
          return res.render("signup", {
            status: "failed",
            message: "Mobile number already exists",
          });
        }
      }
      // console.log("passwords match");
      try {
        const user = await UserModel.findOne({ username: username });
        // console.log("user", user);
        if (user) {
          res.status(400).json({ message: "Username already exists" });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const user = new UserModel({
            username: username,
            password: hashedPassword,
            name: name,
            rollNo: rollNo,
            email: email.toLowerCase(),
            accountType: "learner",
            profileCreatedAt: Date.now(),
          });
          user.save((err, user) => {
            if (err) {
              return res.status(400).send({
                status: "failed",
                message: `Error occured While Creating account ${err}`,
              });
            } else {
              return res.status(200).json({
                status: "success",
                message: "User created successfully",
              });
            }
          });
        }
      } catch (err) {
        console.log("err", err);
        return res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
    } else {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }
  };

  static sigin = async (req, res) => {
    const { rollNo, password, email } = req.body;
    // console.log(req.body);
    var user;
    if ((rollNo || email) && password) {
      try {
        if (rollNo) {
          console.log("roll no. found");
          user = await UserModel.findOne({ rollNo: rollNo }).select(
            "+password"
          );
        } else {
          console.log("user email found");

          user = await UserModel.findOne({ email: email.toLowerCase() }).select(
            "+password"
          );
        }
        if (user) {
          // console.log("password if user : ", user.password);
          const isvalidPassword = await bcrypt.compare(password, user.password);

          // console.log(isvalidPassword);
          // console.log("user", user);
          if (isvalidPassword) {
            const id = user._id;
            console.log("id", id);
            const token = jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY, {
              expiresIn: 604800,
            });

            // var token = "token";
            console.log("Jwt complete :" + token);
            res.cookie("userToken", token, {
              httpOnly: true,
              expires: new Date(Date.now() + 604800000),
            });
            // console.log(user);
            res.status(200).json({
              status: "success",
              token: token,
              data: user,
              message: "User logged in successfully",
            });
            console.log("Singin complete");
          } else {
            console.log("not found");
            res.status(400).json({
              status: "failed",
              message: "Invalid Credientials",
            });
          }
        } else {
          console.log("not found amil");
          res.status(400).json({
            status: "failed",
            message: "User not found",
          });
        }
      } catch (err) {
        res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
    } else {
      res.status(400).render("signup", {
        status: "failed",
        message: "All fields are required",
      });
    }
  };

  static updates = async (req, res) => {
    const { name, username, email, bio, mobile } = req.body;
    console.log(req.body);
    const user = await UserModel.findById(req.user._id);
    if (user) {
      try {
        if (name) {
          user.name = name;
        }
        if (email) {
          user.email = email;
        }
        if (mobile) {
          user.mobile = mobile;
        }
        if (bio) {
          user.bio = bio;
        }
        if (username) {
          const existingUser = await UserModel.findOne({
            username: username,
          });
          if (existingUser) {
            return res
              .status(400)
              .json({ status: "failed", message: "Username already exists" });
          }
          user.username = username;
        }
        await user.save();
        const userr = await UserModel.findById(req.user._id);
        console.log(userr);
        return res.status(200).json({
          status: "success",
          message: "updated successfully",
        });

      } catch (err) {
        res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "User not found",
      });
    }
  };

  static addSkillAndSocialMedia = async (req, res) => {
    const { type, skill, socialMediaName, socialMediaLink } = req.body;
    var user = await UserModel.findById(req.user._id);
    try {
      if (type == "skill") {
        user.skills.push(skill);
      } else {
        user.socialMedia.push({
          name: socialMediaName,
          link: socialMediaLink,
        })
      }
      console.log(user);
      await user.save();
      var socm = await UserModel.findOne(
        { _id: req.user._id },
        { socialMedia: { $slice: -1 } }
      );
      console.log(socm.socialMedia[0]);
      return res.status(200).json({
        status: "success",
        data: socm.socialMedia[0],
        message: `${type} added successfully`,
      })
    } catch (err) {
      return res.status(500).json({
        status: "failed",
        message: err.message,
      });
    }
  }
  static removeSkillAndSocialMedia = async (req, res) => {
    const { type, skill, socialMediaId } = req.body;
    console.log(req.body);
    try {
      if (type == "skill") {
        await UserModel.updateOne(
          { _id: req.user._id },
          {
            $pull: {
              skills: skill,
            },
          }
        );
      } else {
        await UserModel.updateOne(
          { _id: req.user._id },
          {
            $pull: {
              socialMedia: { _id: socialMediaId },
            },
          }
        );
      }
      return res.status(200).json({
        status: "success",
        message: `${type} removed successfully`,
      })
    } catch (err) {
      return res.status(500).json({
        status: "failed",
        message: err.message,
      });
    }
  }

  static changeUserPassword = async (req, res) => {
    const { password, confirm_pass } = req.body;
    if (password && confirm_pass) {
      if (password !== confirm_pass) {
        res.send({
          status: "failed",
          message: "Password and Confirm Password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });
        res.send({
          status: "Success",
          message: "Password Changed SuccessFully",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  };

  static loggedUserData = async (req, res) => {
    res.send({
      status: "success",
      data: req.user,
    });
  };

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://127.0.0.1:8000/api/user/reset/${user._id}/${token}`;
        console.log(link);
        // Send Email

        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Evika - Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`,
        });
        res.send({
          status: "success",
          message: "Password Reset Email Sent... Please Check Your Email",
        });
      } else {
        res.send({ status: "failed", message: "Email doesn't exists" });
      }
    } else {
      res.send({ status: "failed", message: "Email Field is Required" });
    }
  };

  static userPasswordReset = async (req, res) => {
    const { password, confirm_pass } = req.body;
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && confirm_pass) {
        if (password !== confirm_pass) {
          res.send({
            status: "failed",
            message: "New Password and Confirm New Password doesn't match",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await UserModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
          res.send({
            status: "success",
            message: "Password Reset Successfully",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Invalid Token" });
    }
  };

  static likedPosts = async (req, res) => {
    try {
      console.log(req.user._id);
      const user = await UserModel.findById(req.user._id);
      // console.log(user);
      const likedPosts = user.likedPosts;
      // console.log(likedPosts);
      res.status(200).json({
        status: "success",
        data: likedPosts,
      });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        message: err.message,
      });
    }
  };
}

export default AccountController;
