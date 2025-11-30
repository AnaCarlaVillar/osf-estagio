const model = require("../../models/categoriaModel");
const registerModel = require("../../models/registerCategoriaModel");

exports.getAll = async (req, res) => {
  try {
    const categorias = await model.getAll();
    res.json(categorias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};

exports.getById = async (req, res) => {
  try {
    const categoria = await model.getById(req.params.id);
    res.json(categoria);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};
exports.register = async function (req, res) {
  try {
    const { name, description } = req.body;

    await registerModel.registerNewCategory(name, description);

    console.log(`✅ - Category: \x1b[92m${name}\x1b[0m, \x1b[92m${description}\x1b[0m\n`);
    return res.redirect("/services");

  } catch (err) {
    console.error('❌ - Category: \x1b[31m$', err ,'\x1b[0m\n');
    return res.status(500).send("Erro ao registrar categoria.");
  }
};