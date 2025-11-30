const newPath = "pages/shop/booking/index";

exports.page = (req, res) => { res.render(newPath, { page: "booking", title: "Booking" }); };
