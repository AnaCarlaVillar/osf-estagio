const newPath = "pages/admin/components/employees/index.html";

exports.page = (req, res) => { res.render(newPath, { page: "employees", title: "Employees" }); };