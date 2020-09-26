const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const is = require('is_js');
const Joi = require('joi');

const schema = Joi.object({
  subject: Joi.string().max(20).required(),
  from: Joi.string().email().required(),
  to: Joi.string().email().required(),
  text: Joi.string(),
  html: Joi.string(),
}).with('subject', 'to');

const provider = {
  SMTP: 'smtp',
  API: 'api',
};

function GetProvider() {
  if (is.existy(process.env.SMTP_URL)) {
    return provider.SMTP;
  }

  if (is.existy(process.env.MAILGUN_API_KEY)) {
    return provider.API;
  }

  throw new Error('No provider defined');
}

const BuildSMTPTransportLayer = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_URL,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SSL,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

const BuildMailgunAPITransportLayer = () => {
  return nodemailer.createTransport(
    mg({
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    })
  );
};

const SendMail = (transport, mailOptions) => {
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(`An error occured when sending email : ${error}`);
    }
    return info;
  });
};

exports.send = function send(req, res) {
  const { error, value } = schema.validate(req.body);
  let transport;

  if (is.existy(error)) {
    return res.status(404).send('Invalid input');
  }

  try {
    switch (GetProvider()) {
      case provider.SMTP:
        transport = BuildSMTPTransportLayer();
        break;
      case provider.API:
        transport = BuildMailgunAPITransportLayer();
        break;
      default:
        return res.status(500).send('An error occured while getting provider');
    }

    const info = SendMail(transport, value);
    res.status(200).send(info);
  } catch (err) {
    res.status(500).send(err);
  }
};
