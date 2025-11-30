const newPath = "pages/home/index";

exports.page = (req, res) => { res.render(newPath, { page: "home", title: "Home" }); };