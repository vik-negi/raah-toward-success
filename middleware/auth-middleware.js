import jwt from "jsonwebtoken";
import UserModel from "../models/userSchema.js";
import { members } from "../data/members.js";

class Auth {
  static checkUserAuth = async (req, res, next) => {
    const { token } = req.cookies.userToken;
    if (token) {
      try {
        const userId = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(process.env.JWT_SECRET_KEY);
        // console.log(process.env.JWT_SECRET_KEY);
        // console.log("userId", userId);
        req.user = await UserModel.findById(userId).select("-password");
        console.log("middleware works");
        next();
      } catch (error) {
        res
          .status(401)
          .send({ status: "failed", message: "Unauthorized User" });
      }
    }
    if (!token) {
      res
        .status(401)
        .send({ status: "failed", message: "Unauthorized User No Token" });
    }
  };

  static isUserAuth = async (req, res) => {
    const token = req.cookies.userToken;
    console.log("token", token);
    if (token) {
      try {
        const userId = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await UserModel.findById(userId).select("-password");
        console.log(members);
        return res.render("index", { user: req.user, members: members });
      } catch (error) {
        return res.status(400).render("index", {
          status: "failed",
          message: "Unauthorized User",
          members: members,
        });
      }
    }
    if (!token) {
      return res.render("index", { members: members });
    }
  };
}

export default Auth;
