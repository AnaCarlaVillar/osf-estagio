const newPath = "pages/shop/team/index";
export const page = (req, res) => {
    const token = req.params.token;
    res.render(newPath, { page: "team", title: "Team", token });
};
//# sourceMappingURL=teamController.js.map