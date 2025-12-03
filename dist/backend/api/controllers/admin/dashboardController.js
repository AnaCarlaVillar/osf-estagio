// dashboardController.ts
const newPath = "pages/admin/dashboard/index";
export const page = (req, res) => {
    const token = req.params.token;
    res.render(newPath, { page: "dashboard", title: "Dashboard", token });
};
//# sourceMappingURL=dashboardController.js.map