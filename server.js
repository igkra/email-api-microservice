const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const app = express();

const PORT = process.env.PORT || 3000;
let env;

if (process.env.NODE_ENV === 'production') {
  env = process.env;
} else {
  env = require('./config.json');
}

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

app.listen(PORT);


app.post('/email', (req, res) => {
  let email = req.body.email;
  let message = req.body.message;
  let name = req.body.name;

  nodemailerMailgun.sendMail({
    from: 'santa@jullista.com',
    to: email,
    subject: `Message from ${name}`,
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