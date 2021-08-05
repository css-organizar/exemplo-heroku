const connection = require('../database/connection');
const md5 = require('md5');
const dbUtils = require('../commons/database_function');
const jwtUtils = require('../commons/jwt_function');

module.exports = {

    async register(req, res) {

        await jwtUtils.validateApplicationToken(req, res);

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

            if (internalBody['senha'] != undefined)
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
                message: "Falha ao tentar registar um novo usuário",
                error: e.message
            });

        }

    },

    async create(req, res) {

        await jwtUtils.validateApplicationToken(req, res);

        try {

            var internalBody = req.body;

            if (internalBody['email'] === undefined) {

                return res.status(400).json({
                    message: "Favor informar o e-mail",
                });

            }

            if (await dbUtils.validarEmailCadastroUsuario(internalBody['email']) == true) {

                return res.status(400).json({
                    message: "E-mail já cadastrado no sistema",
                });

            }

            if (internalBody['senha'] != undefined)
                internalBody['senha'] = md5(internalBody['senha']);

            const [id] = await connection('usuario')
                .insert(req.body)
                .returning('id');

            var listOfTableColumns = await dbUtils.getListOfTableColumns('usuario', 'senha');

            const usuarios = await connection('usuario')
                .select(listOfTableColumns.split(","))
                .where('usuario.id', id);

            return res.status(201).json(usuarios[0]);

        } catch (e) {

            return res.status(400).json({
                message: "Falha ao tentar gravar um usuario no sistema",
                error: e.message
            });

        }

    },

    async getAll(req, res, next) {

        await jwtUtils.validateApplicationToken(req, res);

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
                message: "Falha ao tentar listar usuarios",
                error: e.message
            });

        }

    },

    async getById(req, res, next) {

        await jwtUtils.validateApplicationToken(req, res);

        try {

            var listOfTableColumns = await dbUtils.getListOfTableColumns('usuario', 'senha');

            const usuarios = await connection('usuario')
                .select(listOfTableColumns.split(","))
                .where('usuario.id', req.params['id']);

            return res.status(usuarios.length > 0 ? 200 : 204).json(usuarios[0]);

        } catch (e) {

            return res.status(400).json({
                message: "Falha ao tentar listar usuario pelo ID",
                error: e.message
            });

        }

    },

    async update(req, res) {

        await jwtUtils.validateApplicationToken(req, res);

        try {

            var internalBody = req.body;

            if (Number(req.params['id']) === 1) {

                return res.status(400).json({
                    message: "O usuário administrador nao pode ser alterado",
                });

            }

            if (req.body["id"] != undefined) {
                return res.status(400).json({
                    message: "O campo id não pode ser informado neste método",
                });
            }

            if (internalBody["senha"] != undefined)
                internalBody["senha"] = md5(internalBody["senha"]) || '';

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
                message: "Falha ao tentar alterar dados do usuário",
                error: e.message
            });

        }

    },

    async delete(req, res, next) {

        await jwtUtils.validateApplicationToken(req, res);

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

            return res.status(204).json(usuarios);

        } catch (e) {

            return res.status(400).json({
                message: "Falha ao tentar excluir usuario",
                error: e.message
            });

        }
    }

}