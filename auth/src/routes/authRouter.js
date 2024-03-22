const express = require("express");
const bcrypt = require("bcrypt");
const { User, Master } = require("../../db/models");
const generateTokens = require("../utils/generateTokens");
const jwtConfig = require("../config/jwtConfig");
const cookiesConfig = require("../config/cookiesConfig");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const { generateConfirmationCode } = require("../utils/nodeMailer");
const { mailer } = require("../utils/nodeMailer");

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.hashpass);
    console.log(isValid);
    console.log(isValid);
    if (!isValid) return res.status(400).json({ message: "Invalid password" });

    const plainUser = user.get();
    delete plainUser.hashpass;
    const { accessToken, refreshToken } = generateTokens({ user: plainUser });
    return res
      .cookie(jwtConfig.refresh.name, refreshToken, cookiesConfig.refresh)
      .status(200)
      .json({ accessToken, user: plainUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// authRouter.post("/signup", async (req, res) => {
//   console.log("TUT", req.body);
//   console.log("TUT", req.body);

//   try {
//     const { email, password, name } = req.body;
//     const [user, created] = await User.findOrCreate({
//       where: { email },
//       defaults: {
//         name,
//         subscribeLevl: "0",
//         role: "user",
//         hashpass: await bcrypt.hash(password, 10),
//       },
//     });
//     if (!created)
//       return res.status(400).json({ message: "Email already exists" });

//     const plainUser = user.get();
//     delete plainUser.hashpass;
//     const { accessToken, refreshToken } = generateTokens({ user: plainUser });
//     return res
//       .cookie(jwtConfig.refresh.name, refreshToken, cookiesConfig.refresh)
//       .status(200)
//       .json({ accessToken, user: plainUser });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// });

authRouter.post("/logout", (req, res) => {
  res.clearCookie(jwtConfig.refresh.name).sendStatus(200);
});

authRouter.get("/check", verifyRefreshToken, (req, res) => {
  res.json({ user: res.locals.user, accessToken: "" });
});

authRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, address, telephone } = req.body;
    await User.update({ name, img, address, telephone }, { where: { id } });

    const data = await User.findByPk(id);

    const plainUser = data.get();
    delete plainUser.hashpass;
    const { accessToken, refreshToken } = generateTokens({ user: plainUser });
    res
      .cookie(jwtConfig.refresh.name, refreshToken, cookiesConfig.refresh)
      .status(200)
      .json({ accessToken, user: plainUser });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

authRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { img } = req.body;
    await User.update({ img: img.slice(7) }, { where: {id} });

    const data = await User.findByPk(id);

    const plainUser = data.get();
    delete plainUser.hashpass;
    const { accessToken, refreshToken } = generateTokens({ user: plainUser });
    console.log({ accessToken, user: plainUser });
    res
      .cookie(jwtConfig.refresh.name, refreshToken, cookiesConfig.refresh)
      .status(200)
      .json({ accessToken, user: plainUser });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, confirmationCode } = req.body;

    const user = await User.findOne({
      where: { email, confirmationCode },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid confirmation code" });
    }

    await user.update({ confirmationCode: null });

    const plainUser = user.get();
    delete plainUser.hashpass;
    const { accessToken, refreshToken } = generateTokens({ user: plainUser });
    return res
      .cookie(jwtConfig.refresh.name, refreshToken, cookiesConfig.refresh)
      .status(200)
      .json({ accessToken, user: plainUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

authRouter.post("/confirm", async (req, res) => {
  const confirmationCode = 123456;
  try {
    const { email, password, name } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        subscribeLevl: "0",
        role: "user",
        confirmationCode,
        hashpass: await bcrypt.hash(password, 10),
      },
    });
    if (!created)
      return res.status(400).json({ message: "Email already exists" });

    const plainUser = user.get();
    delete plainUser.hashpass;
    const message = {
      to: email,
      subject: "Подтверждение регистрации",
      text: `Ваш код подтверждения: ${confirmationCode}`,
    };
    mailer(message);
    return res.status(200).json({ message: "Confirmation code sent" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = authRouter;
