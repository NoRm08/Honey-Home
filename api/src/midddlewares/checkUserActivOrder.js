const { Order, User } = require("../../db/models");

async function checkUserActiveOrder(req, res, next) {
  const userId = res.locals.user.id;
  const user = await User.findByPk(userId);
  const { orderCount } = user;
  console.log("-------------->>>>>>>>>>>>>>", user);
  if (orderCount < 10) {
    next();
  }else{
    res.status(400).json({message: "You can't create more than 10 orders"})
  }
  
}

module.exports = checkUserActiveOrder;
