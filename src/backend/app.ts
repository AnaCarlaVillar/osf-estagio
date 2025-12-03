// app.ts

import express, { Request, Response } from 'express';
import path from "path";
import { fileURLToPath } from "url";

import setupStatic from "./core/middleware/static.js";

import login from "./api/routes/global/loginRoute.js";
import register from "./api/routes/global/registerRoute.js";
import home from "./api/routes/global/homeRoute.js";
import report from "./api/routes/admin/reportRoute.js";
import dashboard from "./api/routes/admin/dashboardRoute.js";
import services from "./api/routes/admin/servicesRoute.js";
import category from "./api/routes/admin/categoryRoute.js";
import service from "./api/routes/admin/serviceRoute.js";
import employees from "./api/routes/admin/employeesRoute.js";
import pricing from "./api/routes/global/pricingRoute.js";
import team from "./api/routes/global/teamRoute.js";
import booking from "./api/routes/global/bookingRoute.js";
import confirm from "./api/routes/global/confirmRoute.js";
import bookingReport from "./api/routes/report/bookingRoute_report.js";
import serviceListReport from "./api/routes/report/serviceListRoute_report.js";
import userlistReport from "./api/routes/report/userListRoute_report.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "../frontend/views"));
app.set("view engine", "ejs");
app.locals.basedir = path.join(__dirname, "../frontend/views");

setupStatic(app);

async function initLiveReload() {
  if (process.env.NODE_ENV !== 'production') {
    const { default: setupLiveReload } = await import("./core/utils/liveReload.js");
    setupLiveReload(app);
  }
}

initLiveReload();

app.get('/', (req: Request, res: Response) => {
  res.redirect('/login');
});

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
app.use('/', confirm);
app.use('/', bookingReport);
app.use('/', serviceListReport);
app.use('/', userlistReport);

export default app;