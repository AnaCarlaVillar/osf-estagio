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
import registerEmployee from "./api/routes/admin/registerEmployeeRoute.js";
import pricing from "./api/routes/global/pricingRoute.js";
import team from "./api/routes/global/teamRoute.js";
import products from "./api/routes/global/productsRoute.js";
import produtoAdmin from "./api/routes/admin/produtoRoute.js";
import booking from "./api/routes/global/bookingRoute.js";
import confirm from "./api/routes/global/confirmRoute.js";
import agendamento from "./api/routes/global/agendamentoRoute.js";
import bookingReport from "./api/routes/report/bookingRoute_report.js";
import serviceListReport from "./api/routes/report/serviceListRoute_report.js";
import userlistReport from "./api/routes/report/userListRoute_report.js";
import agendamentoReport from "./api/routes/report/agendamentoRoute_report.js";
import financeiro from "./api/routes/admin/financeiroRoute.js";

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
app.use('/', registerEmployee);
app.use('/', pricing);
app.use('/', team);
app.use('/', booking);
app.use('/', confirm);
app.use('/', products);
app.use('/', produtoAdmin);
app.use('/', agendamento);
app.use('/', bookingReport);
app.use('/', serviceListReport);
app.use('/', userlistReport);
app.use('/', agendamentoReport);
app.use('/', financeiro);

export default app;