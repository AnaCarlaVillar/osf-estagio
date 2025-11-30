const newPath = "pages/admin/dashboard/index.html";

exports.page = (req, res) => { res.render(newPath, { page: "dashboard", title: "Dashboard" }); };