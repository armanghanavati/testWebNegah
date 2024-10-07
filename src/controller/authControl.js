const uuid = require("uuid");
const asyncWrapper = require("../middleware/asyncWrapper");
const { UnAthenticated, CustomErrorApi } = require("../err/index");
const { StatusCodes } = require("http-status-codes");
const id = uuid.v4();
const User = require("../model/userModel");
const mongoose = require("mongoose");
require("dotenv").config();

const register = asyncWrapper(async (req, res) => {
  const { userName, password, role } = req.body;
  let userRole;

  if (role === 1) {
    userRole = "user";
  } else if (role === 2) {
    userRole = "admin";
  } else {
    userRole = "user";
  }

  if (!userName || !password) {
    throw new CustomErrorApi(
      "لطفا کد کاربری و یا رمز عبور خود را وارد کنید",
      StatusCodes.BAD_REQUEST
    );
  }
  const registerUser = await User.create({
    role: userRole,
    userName,
    password,
  });
  const token = registerUser.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ code: 0, result: registerUser, token });
});

const login = asyncWrapper(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new CustomErrorApi("لطفا نام کاربری یا رمزعبور را وارد کنید");
  }

  const userLogin = await User.findOne({ userName });
  if(!userLogin){
    throw new UnAthenticated("کاربری با این مشخصات یافت نشد")
  }

  const fixHashPass = await userLogin.comparePass(password);

  if (!fixHashPass) {
    throw new UnAthenticated("تکن نامعتبر");
  }

  console.log(fixHashPass);

  const token = userLogin.createJWT();
  res.status(StatusCodes.CREATED).json({ code: 0, token, result: userLogin });
});

const dashboard = asyncWrapper(async (req, res) => {
  const { userName, userId } = req.user;
  console.log(userName, userId);
  res.status(201).json({
    code: 0,
    result: { userName, userId },
  });
});

module.exports = { login, register, dashboard };
