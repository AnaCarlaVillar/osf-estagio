// homeController.ts
const newPath = "pages/home/index";
export const page = (req, res) => {
    const token = req.params.token;
    const cargo = req.user?.cargo;
    res.render(newPath, { page: "home", title: "Home", token, cargo });
};
//# sourceMappingURL=homeController.js.map