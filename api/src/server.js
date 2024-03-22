
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const masterRouter = require("./routes/masterRouter");

const apiSkill = require("./routes/apiSkill");

const uploadRouter = require("./routes/uploadRoute");
const subscribeRouter = require("./routes/subscribeRouter");

const verifyAccessToken = require('./midddlewares/verifyAccessToken');
const orderRouter = require('./routes/orderRouter');
const userRouter = require('./routes/userRouter');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ extended: true }));
app.use(express.static("public"));

app.use('/api/masters', masterRouter);

app.use('/api/upload', uploadRouter);
app.use('/api/subscribe', subscribeRouter)
app.use('/api/user', userRouter)
app.use("/api/skill", apiSkill);
app.use("/api/order", orderRouter);


app.listen(PORT, () => console.log(`API server has started on port ${PORT}`));
