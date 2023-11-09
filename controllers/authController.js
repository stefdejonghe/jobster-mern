import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

export const register = async (req, res) => {
  res.send("register user");
};

export const login = async (req, res) => {
  res.send("login user");
};
