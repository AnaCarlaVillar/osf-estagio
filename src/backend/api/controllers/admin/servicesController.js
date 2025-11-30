const newPath = "pages/admin/components/services/index";

exports.page = (req, res) => { res.render(newPath, { page: "services", title: "Services" }); };