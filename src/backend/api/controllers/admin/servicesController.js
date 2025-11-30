const newPath = "pages/admin/components/services/index.html";

exports.page = (req, res) => { res.render(newPath, { page: "services", title: "Services" }); };