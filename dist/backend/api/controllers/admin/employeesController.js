// employeesController.ts
const newPath = "pages/admin/components/employees/index";
export const page = (req, res) => {
    const token = req.params.token;
    res.render(newPath, { page: "employees", title: "Employees", token });
};
//# sourceMappingURL=employeesController.js.map