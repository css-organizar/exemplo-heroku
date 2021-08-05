/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const jwt = require('jsonwebtoken');
const connection = require('../database/connection');
const md5 = require('md5');

module.exports = {
    status(req, res, next) {
        try {
            return res.status(200).json({
                status: "ativo",
                data: {
                    data_status: new Date()
                }
            });
        } catch (e) {
            return res.status(400).json({
                status: "inativo",
                data: {
                    data_status: new Date()
                }
            });
        }
    },

    async authentication(req, res, next) {
        try {
            const { usr, pwd } = req.body;

            const usuario = await connection('usuario')
                .limit(1)
                .where('email', usr)
                .select('*');

            if (usuario.length === 0) {
                res.status(401).json({
                    message: 'Login inválido!'
                });
            }

            const pwdMD5 = md5(pwd);

            if (usr === usuario[0]['email'] && pwdMD5 === usuario[0]['senha']) {

                //auth ok
                const id = usuario[0]['id'];
                const email = usuario[0]['email'];
                const nome = usuario[0]['nome'];

                const token = jwt.sign({ id, email, nome }, process.env.SECRET, {
                    expiresIn: 3600 // expires in 1h
                });

                return res.status(201).json({
                    auth: true,
                    token: token
                });

            }

            res.status(401).json({
                message: 'Login inválido!'
            });
        } catch (e) {
            return res.status(400).json({
                message: "Falha",
                error: e.message
            });
        }

    }
}