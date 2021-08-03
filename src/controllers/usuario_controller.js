const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { nome, email, telefone, senha } = req.body;

        const [id] = await connection('usuario').insert({
            nome,
            email,
            telefone,
            senha,
        }).returning('id');

        const usuarios = await connection('usuario').where('usuario.id', id);
        return res.json(usuarios);
    },

    asyncget(req, res, next) {

        if (req.query['email'] != null) {
            usuarios = await connection('usuario').select('*').where('usuario.email', req.query['email']);
            res.json(usuarios);
        } else {
            usuarios = await connection('usuario').select('*');
            res.json(usuarios);
        }

        res.json(usuarios);

    },

    async getById(req, res, next) {
        const usuarios = await connection('usuario').select('*').where('usuario.id', req.params['id']);
        res.json(usuarios);
    },

    async delete(req, res, next) {
        const usuarios = await connection('usuario').where('usuario.id', req.params['id']).del();
        res.json(usuarios);
    }
}