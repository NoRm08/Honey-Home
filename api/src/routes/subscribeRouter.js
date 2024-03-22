const express = require("express");
const { User } = require("../../db/models");
const verifyAccessToken = require("../midddlewares/verifyAccessToken");
const checkSubscribe = require("../midddlewares/checkSubscibe");

const generateTokens = require("../../../auth/src/utils/generateTokens");
const jwtConfig = require("../../../auth/src/config/jwtConfig");
const cookiesConfig = require("../../../auth/src/config/cookiesConfig");

const subscribeRouter = express.Router();

subscribeRouter.post("/", verifyAccessToken, async (req, res) => {
  const userId = res.locals.user.id;
  const user = await User.findByPk(userId);
  const { endSubscibe } = user;
  if (user.endSubscibe) {
    const date = new Date(endSubscibe);
    date.setDate(endSubscibe.getDate() + 30);
    await user.update({
      endSubscibe: date,
      orderCount: 0,
    });
    await user.save();
  } else {
    const currentDate = new Date();
    currentDate.setDate(new Date().getDate() + 30);
    await user.update({
      subscribeLevl: "1",
      endSubscibe: currentDate,
    });
    await user.save();
  }
  const data = await User.findByPk(userId);
  const plainUser = data.get();
  delete plainUser.hashpass;
  const { accessToken, refreshToken } = generateTokens({ user: plainUser });
  res
    .cookie(jwtConfig.refresh.name, refreshToken, cookiesConfig.refresh)
    .json({ accessToken, user: plainUser });
});

module.exports = subscribeRouter;
