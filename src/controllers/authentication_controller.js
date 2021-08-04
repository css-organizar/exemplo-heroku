const jwt = require('jsonwebtoken');
const connection = require('../database/connection');

/**
 * Status Result
 *   - 200: ok 
 *   - 201: created
 *   - 202: Accepted
 *   - 204: No Content
 *   - 401: Unauthorized
 */

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
                message: "Falha",
                error: e.message
            });
        }
    },

    async authentication(req, res, next) {
        try {
            const { usr, pwd } = req.body;

            console.log(`email: ${usr}`);
            console.log(`senha: ${pwd}`);

            const usuario = await connection('usuario')
                .limit(1)
                .where('email', usr)
                .select('*');

            if (usr === usuario[0]['email'] && pwd === usuario[0]['senha']) {

                //auth ok
                const id = usuario[0]['id'];
                const email = usuario[0]['email'];
                const nome = usuario[0]['nome'];

                const token = jwt.sign({ id, email, nome }, process.env.SECRET, {
                    expiresIn: 3600 // expires in 1h
                });

                console.log(`Token Gerado com Sucesso!`);
                console.log(`Token: ${token}`);

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