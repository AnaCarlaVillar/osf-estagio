const express = require('express');
const path = require("path");
const session = require('./api/routes/admin/sessionRoute.js');
const login = require('./api/routes/global/loginRoute.js');
const register = require('./api/routes/global/registerRoute.js')
const home = require('./api/routes/global/homeRoute.js');
const report = require('./api/routes/admin/reportRoute.js');
const dashboard = require('./api/routes/admin/dashboardRoute.js');
const services = require('./api/routes/admin/servicesRoute.js');
const category = require('./api/routes/admin/categoryRoute.js');
const service = require('./api/routes/admin/serviceRoute.js');

const employees = require('./api/routes/admin/employeesRoute.js');

const pricing = require('./api/routes/global/pricingRoute.js');
const team = require('./api/routes/global/teamRoute.js');
const booking = require('./api/routes/global/bookingRoute.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "../frontend/views"));
app.set("view engine", "ejs");
app.locals.basedir = path.join(__dirname, "../frontend/views");

require('./core/middleware/static.js')(app);

if (process.env.NODE_ENV !== 'production') {
  const setupLiveReload = require('./core/utils/liveReload.js');
  setupLiveReload(app);
}

const sessionMiddleware = require('./core/middleware/session.js');
app.use(sessionMiddleware);

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/', session);
app.use('/', login);
app.use('/', register);
app.use('/', home);
app.use('/', report);
app.use('/', dashboard);
app.use('/', services);
app.use('/', category);
app.use('/', service);

app.use('/', employees);

app.use('/', pricing);
app.use('/', team);
app.use('/', booking);

module.exports = app;