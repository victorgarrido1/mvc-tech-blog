const path = require("path");
const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');


const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const PORT = process.env.PORT || 3001;
const app = express();

const hbs = exphbs.create({ helpers});

//Set up session object with secret, cookie, and store
