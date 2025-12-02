import * as model from '../../models/servicoModel.js';
import * as registerModel from '../../models/registerServicoModel.js';
import { generateUserToken } from "../../../core/utils/token.js";
export const getAll = async (req, res) => {
    try {
        const servicos = await model.getAll();
        res.json(servicos);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar servico' });
    }
};
export const getById = async (req, res) => {
    try {
        const servico = await model.getById(Number(req.params.id));
        res.json(servico);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar servico' });
    }
};
export const register = async (req, res) => {
    try {
        const { categoria, nome, descricao, duracao, preco } = req.body;
        await registerModel.registerNewService(categoria, nome, descricao, duracao, preco);
        console.log(`✅ - Service: \x1b[92m${categoria}\x1b[0m, \x1b[92m${nome}\x1b[0m, \x1b[92m${descricao}\x1b[0m, \x1b[92m${duracao}\x1b[0m, \x1b[92m${preco}\x1b[0m\n`);
        if (!req.user?.id)
            return res.status(401).send("Usuário não autenticado");
        const token = generateUserToken({
            id: req.user.id,
            cargo: req.user.cargo ?? null,
        });
        return res.redirect(`/services/${token}`);
    }
    catch (err) {
        console.error('❌ - Service: \x1b[31m$', err, '\x1b[0m\n');
        return res.status(500).send('Erro ao registrar servico.');
    }
};
//# sourceMappingURL=serviceController.js.map