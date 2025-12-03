// teamController.ts
const newPath = "pages/shop/team/index";
export const page = (req, res) => {
    const token = req.params.token;
    const service = req.query.service;
    res.render(newPath, { page: "team", title: "Team", token, service });
};
//# sourceMappingURL=teamController.js.map