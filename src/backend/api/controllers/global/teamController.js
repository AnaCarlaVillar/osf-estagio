const newPath = "pages/shop/team/index.html";

exports.page = (req, res) => { res.render(newPath, { page: "team", title: "Team" }); };