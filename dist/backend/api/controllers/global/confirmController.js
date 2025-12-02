const newPath = "pages/shop/confirm/index";
export const page = (req, res) => {
    const token = req.params.token;
    const service = req.query.service;
    const barber = req.query.barber;
    const datetime = req.query.datetime;
    res.render(newPath, { page: "confirm", title: "Confirm", token, service, barber, datetime });
};
//# sourceMappingURL=confirmController.js.map