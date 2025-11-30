const newPath = "pages/shop/team/index";

exports.page = (req, res) => { res.render(newPath, { page: "team", title: "Team" }); };