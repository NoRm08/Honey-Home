const express = require("express");
const { User } = require("../../db/models");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    const plainUser = users.map((user) => user.get());
    plainUser.map((user) => delete user.hashpass);
    res.status(200).json(plainUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRouter;
