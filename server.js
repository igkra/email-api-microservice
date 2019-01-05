const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const basicAuth = require('express-basic-auth');
const cors = require('cors')

require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3000;
const env = process.env;

const auth = {
  auth: {
    api_key: env.MAILGUN_API_KEY,
    domain: env.MAILGUN_DOMAIN
  }
}
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

//This is allowing the app to have access to my public folder
//This is also serving the index.html file to root '/' path, allowing the index.html file to be seen
app.use(express.static('./public'));

//This middleware allows our server routes to have parsed json data from the client
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());

// Add Basic Auth
app.use(basicAuth({
  users: {
    [env.BASIC_AUTH_USER]: env.BASIC_AUTH_PASSWORD
  }
}))

app.use(cors())
app.options('*', cors()) // include before other routes

app.listen(PORT);


app.post('/email', (req, res) => {
  const email = req.body.email;
  const message = req.body.message;

  nodemailerMailgun.sendMail({
    from: 'santa@jullista.com',
    to: email,
    subject: `You've got a Secret Santa`,
    html: `<h4>${message}</h4>`
  }, (err, info) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json({
        success: true,
        message: 'Email Sent'
      });
    }
  });
});