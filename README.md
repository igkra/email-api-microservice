# email-api (with Mailgun)

## Requirements
- Heroku account
- Heroku CLI
- Mailgun account

## Log into Heroku and create
`heroku login`
`heroku create app-name`

## Create .gitignore file
Run `touch .gitignore` to create a .gitignore file
This .gitignore file will prevent git from sending certain files with sensitive / unnecessary information to github.

```
node_modules
config.json
.env
```

## Init new project

`yarn init`

## Install dependencies

`yarn add express body-parser nodemailer nodemailer-mailgun-transport`

## Setup nodemailer
Create .env from `.env.example` and update with your own credentials

## Basic Auth

It is always good to have some security on top of your microservice. So only allowed users can use the API.
Lets add simple Basic Auth checker.

`yarn add express-basic-auth`


## Deploy to Heroku

Prerequisites: Heroku CLI and login

Create new heroku app
`heroku create`

Set Mailgun envs
`heroku config:set MAILGUN_DOMAIN=XXX`
`heroku config:set MAILGUN_API_KEY=XXX`

Deploy to heroku
`git push heroku master`

## Debug heroku

Get latest 200 lines from log
`heroku logs -n 200`

Or stream logs
`heroku logs --tail`

