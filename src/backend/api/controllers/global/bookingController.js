const newPath = "pages/shop/booking/index.html";

exports.page = (req, res) => { res.render(newPath, { page: "booking", title: "Booking" }); };
