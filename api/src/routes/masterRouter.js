const express = require("express");
const bcrypt = require("bcrypt");
const verifyAccessToken = require("../midddlewares/verifyAccessToken");
const { Master, MasterSkill, Skill, User } = require("../../db/models");

const masterRouter = express.Router();

masterRouter.get("/", async (req, res) => {
  try {
    const masters = await Master.findAll({
      include: [{ model: MasterSkill, include: [Skill] }],
    });
    res.status(200).json(masters);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

masterRouter.post("/signupMaster", verifyAccessToken, async (req, res) => {
  try {
    const { email, password, name, experience, telephone } = req.body;
    const [user, created] = await Master.findOrCreate({
      where: { email },
      defaults: {
        name,
        experience,
        telephone,
        raiting: 0,
        img: "http://localhost:3001/images/defoultMasterImg.jpeg",
        hashpass: await bcrypt.hash(password, 10),
      },
    });
    const [masterUser, newCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        role: "master",
        hashpass: await bcrypt.hash(password, 10),
      },
    });
    if (!newCreated)
      return res.status(400).json({ message: "Email already exists" });
    const plainUser = user.get();
    delete plainUser.hashpass;
    if (!created)
      return res.status(400).json({ message: "Email already exists" });

    return res.status(200).json(plainUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

masterRouter.post("/addSkill", async (req, res) => {
  console.log(req.body);
  try {
    const newSkill = await MasterSkill.create(
      {
        skillId: req.body.skillId,
        masterId: req.body.masterId,
      },
      {
        include: { model: Skill },
      }
    );

    const skill = await MasterSkill.findOne({
      where: { id: newSkill.id },
      include: { model: Skill },
    });
    // console.log("LOOOOOOOK", skill);
    return res.status(200).json({
      skill,
    });
  } catch (error) {
    console.error("Ошибка в ручке записи навыков мастера", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

masterRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, experience, telephone } = req.body;
    const [, master] = await Master.update(
      { name, experience, telephone },
      { where: { id }, returning: true }
    );
    // console.log('-----------',master[0]);
      const masretSkils = await Master.findOne({where:{id} , include:{model: MasterSkill}})
      console.log(masretSkils)
    res.status(200).json(masretSkils);
  } catch (error) {
    console.error(error);
    res.status(500).json("Ошибка в ручке изменения", error);
  }
});

masterRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { img } = req.body;
    await Master.update({ img: img.slice(7) }, { where: { id } });
    const data = await Master.findByPk(id);
    const master = data.get();
    delete master.hashpass;
    res.status(200).json(master);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = masterRouter;
