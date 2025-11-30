const newPath = "pages/admin/report/index";

exports.page = (req, res) => { res.render(newPath, { page: "report", title: "Report" }); };