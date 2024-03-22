const express = require("express");
const jwt = require('jsonwebtoken');
const { Skill, Problem, Order } = require("../../db/models");

const apiSkill = express.Router();

apiSkill.get("/", async (req, res) => {
  try {
    const skill = await Skill.findAll({
      include: { model: Problem },
    });

    res.json(skill);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Ошибка при получении проблемы" });
  }
});

apiSkill.post("/", async (req,res)=>{
  try {
    const { user } = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const {problemId, comment} = req.body;
    const newOrder = await Order.create({
      date: new Date(),
      problemId,
      comment,
      userId: user.id,
      priority: true,
      status:('pending')
    });
      res.status(201).json(newOrder);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
})

module.exports = apiSkill;
