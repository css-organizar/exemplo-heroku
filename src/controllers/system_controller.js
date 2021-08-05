const connection = require('../database/connection');
const md5 = require('md5');
const dbUtils = require('../commons/database_function');
const jwtUtils = require('../commons/jwt_function');

module.exports = {

    async getApplicationToken(req, res, next) {
        try {
            var listOfTableColumns = await dbUtils.getListOfTableColumns('system', 'senha');

            const usuarios = await connection('system')
                .select(listOfTableColumns.split(','))
                .where('id', 1);

            return res.status(usuarios.length > 0 ? 200 : 204)
                .json(usuarios[0]);
        } catch (e) {
            return res.status(400).json({
                message: "Falha ao tentar listar usuario pelo ID",
                error: e.message
            });
        }
    }

}