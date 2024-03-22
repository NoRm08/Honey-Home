const express = require("express");
const { Order, User, Problem, Master, Skill } = require("../../db/models");
const checkSubscribe = require("../midddlewares/checkSubscibe");
const verifyAccessToken = require("../midddlewares/verifyAccessToken");
const checkUserActiveOrder = require("../midddlewares/checkUserActivOrder");

const orderRouter = express.Router();

orderRouter.post(
  '/',
  verifyAccessToken,
  checkSubscribe,
  checkUserActiveOrder,
  async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { problemId, comment } = req.body;
      const user = await User.findByPk(userId);
      const { orderCount } = user;
      const newOrder = await Order.create({
        date: new Date(),
        problemId,
        comment,
        userId,
        priority: true,
        status: 'pending',
        userAccept: false,
        masterAccept: false,
      });
      await user.update({ orderCount: orderCount + 1 });
      await user.save();
      const newOrderWithUser = await Order.findOne({
        where: { id: newOrder.id },
        include: [
          { model: User },
          { model: Problem, include: { model: Skill } },
          { model: Master },
        ],
      });
      res.status(201).json(newOrderWithUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

orderRouter.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User },
        { model: Problem, include: { model: Skill } },
        { model: Master },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

orderRouter.patch('/accept', async (req, res) => {
  const { orderId, masterId, dateExp } = req.body;
  try {
    const currentOrder = await Order.findByPk(orderId);
    currentOrder.masterId = masterId;
    currentOrder.dateExp = dateExp;
    currentOrder.status = 'active';
    await currentOrder.save();
    const updeteOrder = await Order.findOne({
      where: { id: orderId },
      include: [
        { model: User },
        { model: Problem, include: { model: Skill } },
        { model: Master },
      ],
    });
    res.status(200).json(updeteOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

orderRouter.delete('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.destroy({ where: { id: orderId } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

orderRouter.put('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { comment } = req.body;
    await Order.update({ comment }, { where: { id: orderId } });
    const updatedComment = await Order.findOne({
      where: { id: orderId },
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

orderRouter.patch('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;

  try {
    const userRole = res.locals.user.role;

    const order = await Order.findByPk(id);

    if (userRole === 'user') {
      await Order.update({ userAccept: true }, { where: { id } });
    }
    if (userRole === 'master') {
      await Order.update({ masterAccept: true }, { where: { id } });
    }

    if (!order) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    if (order.masterAccept === true && order.userAccept === true) {
      await Order.update({ status: 'closed' }, { where: { id } });
    }

    const acceptOrder = await Order.findByPk(id, {
      include: [
        { model: User },
        { model: Problem, include: { model: Skill } },
        { model: Master },
      ],
    });
    console.log('<<<<<<<<>>>>>>>>', acceptOrder);

    return res.status(200).json(acceptOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

module.exports = orderRouter;

module.exports = orderRouter;
