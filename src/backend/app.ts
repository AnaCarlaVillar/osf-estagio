import { Request, Response } from 'express';

const express = require('express');
const path = require("path");
// const session = require('./api/routes/admin/sessionRoute');
const login = require('./api/routes/global/loginRoute');
const register = require('./api/routes/global/registerRoute')
const home = require('./api/routes/global/homeRoute');
const report = require('./api/routes/admin/reportRoute');
const dashboard = require('./api/routes/admin/dashboardRoute');
const services = require('./api/routes/admin/servicesRoute');
const category = require('./api/routes/admin/categoryRoute');
const service = require('./api/routes/admin/serviceRoute');
const employees = require('./api/routes/admin/employeesRoute');
const pricing = require('./api/routes/global/pricingRoute');
const team = require('./api/routes/global/teamRoute');
const booking = require('./api/routes/global/bookingRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "../frontend/views"));
app.set("view engine", "ejs");
app.locals.basedir = path.join(__dirname, "../frontend/views");

require('./core/middleware/static')(app);

if (process.env.NODE_ENV !== 'production') {
  const setupLiveReload = require('./core/utils/liveReload');
  setupLiveReload(app);
}

app.get('/', (req: Request, res: Response) => {
  res.redirect('/login');
});

// app.use('/', session);
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