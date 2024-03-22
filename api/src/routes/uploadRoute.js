const express = require('express');
const uploadFileMiddleware = require('../midddlewares/uploadFileMiddleware');

const uploadRouter = express.Router();

uploadRouter.post('/', uploadFileMiddleware.single('avatar'), (req, res) => {
  try {
    if (req.file) {
        res.json(req.file)
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = uploadRouter;
