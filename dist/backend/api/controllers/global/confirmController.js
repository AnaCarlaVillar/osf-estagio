const newPath = "pages/shop/confirm/index";
export const page = (req, res) => {
    const token = req.params.token;
    res.render(newPath, { page: "confirm", title: "Confirm", token });
};
//# sourceMappingURL=confirmController.js.map