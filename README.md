# email-api

## Requirements

## Log into Heroku and create
`heroku login`
`heroku create app-name`

## Create .gitignore file
Run touch .gitignore to create a .gitignore file
This .gitignore file will prevent git from sending certain files with sensitive / unnecessary information to github.

```
node_modules
config.json
```

## Init new project

`yarn init`

## Install dependencies

`yarn add express body-parser nodemailer nodemailer-mailgun-transport`

## Setup server routes

Create server.js with following content:

```
const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

const PORT = process.env.PORT || 3000;

//This is allowing the app to have access to my public folder
//This is also serving the index.html file to root '/' path, allowing the index.html file to be seen
app.use(express.static('./public'));

//This middleware allows our server routes to have parsed json data from the client
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());

app.listen(PORT);
```

## Setup nodemailer

