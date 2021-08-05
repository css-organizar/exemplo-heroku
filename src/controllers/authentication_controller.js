const jwt = require('jsonwebtoken');
const connection = require('../database/connection');
const md5 = require('md5');
const jwtUtils = require('../commons/jwt_function');

module.exports = {

    async status(req, res, next) {

        await jwtUtils.validateApplicationToken(req, res);

        try {

            return res.status(200).json({
                status: "ativo",
                data_status: new Date()
            });

        } catch (e) {

            return res.status(400).json({
                status: "inativo",
                data_status: new Date(),
                erro: e.message
            });

        }

    },

    async authentication(req, res, next) {

        await jwtUtils.validateApplicationToken(req, res);

        try {

            const internalBody = req.body;

            const usuario = await connection('usuario')
                .limit(1)
                .where('email', internalBody['usr'])
                .select('*');

            if (usuario.length === 0) {
                return res.status(401).json({
                    message: 'Login inválido!'
                });
            }

            const pwdMD5 = md5(internalBody['pwd']);

            if (internalBody['usr'] === usuario[0]['email'] && pwdMD5 === usuario[0]['senha']) {

                //auth ok
                const id = usuario[0]['id'];
                const email = usuario[0]['email'];
                const nome = usuario[0]['nome'];

                const token = jwt.sign({
                        id,
                        email,
                        nome
                    },
                    process.env.SECRET, {
                        expiresIn: 3600 // expires in 1h
                    });

                return res.status(201).json({
                    auth: true,
                    token: token
                });

            }

            return res.status(401).json({
                message: 'Login inválido!'
            });

        } catch (e) {

            return res.status(400).json({
                message: "Falha ao tentar efetuar login no sistema",
                error: e.message
            });

        }

    }

}