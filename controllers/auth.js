import User from "../models/Users.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const registerAuth = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};
export const loginAuth = async (req, res, next) => {
  try {
    const findUser = await User.findOne({ username: req.body.username });
    if (!findUser) return next(createError(404, "User not found!!"));

    const isPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (!isPassword) return next(createError(400, "Wrong password!!"));

    const token = jwt.sign(
      { id: findUser._id, isAdmin: findUser.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = findUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
