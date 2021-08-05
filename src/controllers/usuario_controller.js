/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const connection = require('../database/connection');
const md5 = require('md5');
const dbUtils = require('../commons/database_function');

/**
 * Status Result
 *   - 200: ok 
 *   - 201: created
 *   - 202: Accepted
 *   - 204: No Content
 *   - 401: Unauthorized
 */

module.exports = {

    async register(req, res) {
        try {
            var internalBody = req.body;

            if (req.body["usuario_perfil_id"] != undefined) {
                return res.status(400).json({
                    message: "O campo usuario_perfil_id não pode ser informado neste método",
                });
            }

            if (await dbUtils.validarEmailCadastroUsuario(internalBody['email']) == true) {
                return res.status(400).json({
                    message: "E-mail já cadastrado no sistema",
                });
            }

            if (internalBody['nome'] === undefined) {
                return res.status(400).json({
                    message: "Favor informar o nome do usuário",
                });
            }

            if (internalBody['email'] === undefined) {
                return res.status(400).json({
                    message: "Favor informar o e-mail",
                });
            }

            if (internalBody['telefone'] === undefined) {
                return res.status(400).json({
                    message: "Favor informar o número do telefone",
                });
            }

            if (internalBody['senha'] === undefined) {
                return res.status(400).json({
                    message: "Favor informar uma senha válida",
                });
            }

            internalBody['senha'] = md5(internalBody['senha']);

            const [id] = await connection('usuario')
                .insert(internalBody)
                .returning('id');

            var listOfTableColumns = await dbUtils.getListOfTableColumns('usuario', 'senha');

            const usuarios = await connection('usuario')
                .select(listOfTableColumns.split(","))
                .where('usuario.id', id);

            return res.status(201).json(usuarios[0]);
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }
    },

    async create(req, res) {
        try {
            var { nome, email, telefone, senha } = req.body;

            if (await dbUtils.validarEmailCadastroUsuario(email) == true) {
                return res.status(400).json({
                    message: "E-mail já cadastrado no sistema",
                });
            }

            senha = md5(senha);

            const [id] = await connection('usuario').insert({
                nome,
                email,
                telefone,
                senha,
            }).returning('id');

            var listOfTableColumns = await dbUtils.getListOfTableColumns('usuario', 'senha');

            const usuarios = await connection('usuario')
                .select(listOfTableColumns.split(","))
                .where('usuario.id', id);

            return res.status(201).json(usuarios[0]);
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }
    },

    async getAll(req, res, next) {
        try {

            var usuarios;

            res.header('x-total-count', 0);
            res.header('x-total-count', 0);

            var listOfTableColumns = await dbUtils.getListOfTableColumns('usuario', 'senha');

            if (req.query['email'] != null) {
                usuarios = await connection('usuario')
                    .select(listOfTableColumns.split(","))
                    .where('usuario.email', req.query['email']);

                return res.status(usuarios.length > 0 ? 200 : 204).json(usuarios);
            } else {
                usuarios = await connection('usuario')
                    .select(listOfTableColumns.split(","));

                return res.status(usuarios.length > 0 ? 200 : 204).json(usuarios);
            }
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }
    },

    async getById(req, res, next) {
        try {
            var listOfTableColumns = await dbUtils.getListOfTableColumns('usuario', 'senha');

            const usuarios = await connection('usuario')
                .select(listOfTableColumns.split(","))
                .where('usuario.id', req.params['id']);

            return res.status(usuarios.length > 0 ? 200 : 204).json(usuarios[0]);
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }
    },

    async update(req, res) {
        try {

            var internalBody = req.body;

            if (Number(req.params['id']) === 1) {
                return res.status(400).json({
                    message: "O usuário administrador nao pode ser alterado",
                });
            }

            internalBody["senha"] = md5(internalBody["senha"]);

            const [id] = await connection('usuario')
                .where('id', req.params['id'])
                .update(internalBody)
                .returning('id');

            if (id === undefined) {
                return res.status(400).json({
                    message: "O usuário informado não é valido ou o registro não existe no sistema",
                });
            }

            var listOfTableColumns = await dbUtils.getListOfTableColumns('usuario', 'senha');

            const usuarios = await connection('usuario')
                .select(listOfTableColumns.split(","))
                .where('usuario.id', id);

            return res.status(202).json(usuarios[0]);
        } catch (e) {
            return res.status(400).send({
                message: "Falha",
                error: e.message
            });
        }
    },

    async delete(req, res, next) {
        try {

            if (Number(req.params['id']) === 1) {
                return res.status(400).json({
                    message: "O usuário administrador nao pode ser excluído",
                });
            }

            const [id] = await connection('usuario')
                .where('id', req.params['id'])
                .select()
                .returning('id');

            if (id === undefined) {
                return res.status(400).json({
                    message: "O usuário informado não é valido ou o registro não existe no sistema",
                });
            }

            var listOfTableColumns = await dbUtils.getListOfTableColumns('usuario', 'senha');

            const usuarios = await connection('usuario')
                .select(listOfTableColumns.split(","))
                .where('usuario.id', req.params['id'])
                .del();

            res.status(204).json(usuarios);
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }
    }

}