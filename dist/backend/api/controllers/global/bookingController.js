const newPath = "pages/shop/booking/index";
export const page = (req, res) => {
    const token = req.params.token;
    const service = req.query.service;
    const barber = req.query.barber;
    res.render(newPath, { page: "booking", title: "Booking", token, service, barber });
};
//# sourceMappingURL=bookingController.js.map