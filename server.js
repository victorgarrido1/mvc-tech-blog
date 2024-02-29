const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

// SequelizeStore is a session store for Express using Sequelize as the backend
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Configuration object for Express session middleware
const sess = {
  secret: 'Super secret secret',  // Secret used to sign the session ID cookie
  cookie: {
    maxAge: 3600000     //6 mins
  },                      // Configuration options for the session cookie (empty in this case)
  resave: false,                   // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: true,         // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
  store: new SequelizeStore({      // Using Sequelize as the session store
    db: sequelize                  // Sequelize instance to be used as the database connection
  })
};

// Middleware to set up session management in the Express app
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON bodies and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Using routes defined in './controllers'
app.use(routes);

// Syncing Sequelize models with the database and starting the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
