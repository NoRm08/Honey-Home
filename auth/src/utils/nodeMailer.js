const nodemailer = require("nodemailer");
require('dotenv').config();

const defaultConfig =
  `smtp://${process.env.MASAGES_FROM_EMAIL}:${process.env.EMAIL_PASS}@smtp.gmail.com`;

const transporter = nodemailer.createTransport(defaultConfig, {
  from: `Test mailer <${process.env.MASAGES_FROM_EMAIL}>`,
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log("Сервер готов принимать наши сообщения: ", success);
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Письмо отправлено: ", info);
  });
};

function generateConfirmationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = { mailer, generateConfirmationCode };
