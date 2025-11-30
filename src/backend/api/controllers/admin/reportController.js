const newPath = "pages/admin/report/index.html";

exports.page = (req, res) => { res.render(newPath, { page: "report", title: "Report" }); };