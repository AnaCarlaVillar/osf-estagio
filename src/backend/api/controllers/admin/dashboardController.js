const newPath = "pages/admin/dashboard/index";

exports.page = (req, res) => { res.render(newPath, { page: "dashboard", title: "Dashboard" }); };