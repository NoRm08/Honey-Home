const { User } = require("../../db/models");

async function checkSubscribe(req, res, next) {
  try {
    const userId = res.locals.user.id;
    const user = await User.findByPk(userId);
    const now = new Date();
    if (user.endSubscibe > now) {
      next();
    } else {
      res.status(403).send("Your subscription has expired");
    }
  } catch (error) {
    console.log(error);
    res.status(403).send("You don't have a subscription");
  }
}

module.exports = checkSubscribe;
