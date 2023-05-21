import jwt from "jsonwebtoken";
import UserModel from "../models/userSchema.js";
import { members } from "../data/members.js";

// import dotenv from "dotenv";
var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  // console.log("authorization", authorization);
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      console.log(token);
      const userId = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await UserModel.findById(userId).select("-password");
      next();
    } catch (error) {
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User No Token" });
  }
};

export default checkUserAuth;
