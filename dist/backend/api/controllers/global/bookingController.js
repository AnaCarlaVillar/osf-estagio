const newPath = "pages/shop/booking/index";
export const page = (req, res) => {
    const token = req.params.token;
    res.render(newPath, { page: "booking", title: "Booking", token });
};
//# sourceMappingURL=bookingController.js.map