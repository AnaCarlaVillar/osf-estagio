// servicesController.ts
const newPath = "pages/admin/components/services/index";
export const page = (req, res) => {
    const token = req.params.token;
    res.render(newPath, { page: "services", title: "Services", token });
};
//# sourceMappingURL=servicesController.js.map