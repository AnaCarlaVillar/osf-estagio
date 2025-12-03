// reportController.ts
const newPath = "pages/admin/report/index";
export const page = (req, res) => {
    const token = req.params.token;
    res.render(newPath, { page: "report", title: "Report", token });
};
//# sourceMappingURL=reportController.js.map