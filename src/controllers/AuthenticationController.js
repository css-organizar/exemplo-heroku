const jwt = require('jsonwebtoken');

module.exports = {
    status (req, res, next){
        res.json({
            status: "ativo",
            data: {
               data_status: new Date()
            }
        });
    },

    authentication (req, res, next) {
        const { usr, pwd } = req.body;

        console.log(`Usuario: ${usr}`);
        console.log(`Senha: ${pwd}`);

        if (usr === 'luiz' && pwd === '123') {

            //auth ok
            const id = 1; //esse id viria do banco de dados

            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 900 // expires in 5min
            });

            console.log(`Token Gerado com Sucesso!`);
            console.log(`Token: ${token}`);

            return res.json({
                auth: true,
                token: token
            });

        }

        res.status(401).json({
            message: 'Login inválido!'
        });

    }
}