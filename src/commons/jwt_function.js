const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode");
const connection = require('../database/connection');

module.exports = {
    JWTValidation(req, res, next) {
        try {

            const userToken = req.headers['token'] || '';

            if (!userToken)
                return res.status(401)
                    .json({
                        auth: false,
                        message: 'Token da Usuário inválido ou não informado.'
                    });

            jwt.verify(userToken, process.env.SECRET, function(err, decoded) {

                if (err)
                    return res.status(401)
                        .json({
                            auth: false,
                            message: 'Token da Usuário inválido.'
                        });

                req.userId = decoded.id;
                next();

            });

        } catch (e) {

            return res.status(400).send({
                message: "Falha ao tentar validar o token da aplicação.",
                error: e.message
            });

        }

    },
    async validateApplicationToken(req, res) {

        // var decoded = jwt_decode(req.headers['token']);
        // var decodedHeader = jwt_decode(req.headers['token'], { header: true });

        try {

            const dataLocal = new Date();
            var applicationToken = req.headers['application-token'] || '';

            const systemConfig = await connection('system')
                .where('application_token', applicationToken)
                .select();

            if (systemConfig[0]["data_bloqueio"] < dataLocal)
                return res.status(400).send({
                    message: "Serviço bloqueado, entre em contato com o suporte."
                });

            if (systemConfig.length === 0)
                return res.status(400).send({
                    message: "Token da Aplicação inválido ou não informado."
                });

        } catch (e) {

            return res.status(400).send({
                message: "Falha ao tentar validar o token da aplicação.",
                error: e.message
            });

        }

    }

}