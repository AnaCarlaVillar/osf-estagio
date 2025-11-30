const newPath = "pages/admin/components/employees/index";

exports.page = (req, res) => { res.render(newPath, { page: "employees", title: "Employees" }); };