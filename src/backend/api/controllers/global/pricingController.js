const newPath = "pages/shop/pricing/index";

exports.page = (req, res) => { res.render(newPath, { page: "pricing", title: "Pricing" }); };