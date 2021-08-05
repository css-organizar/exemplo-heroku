const connection = require('../database/connection');

module.exports = {

    async getListOfTableColumns(tableName, ignoreFields, useTimestamps = false) {

        const tableField = await connection('information_schema.columns')
            .select('column_name')
            .where('table_name', tableName)
            .orderBy('ordinal_position')
            .returning('column_name');

        var separador = '';
        var columns = '';
        var internalIgnoredFields = "";

        if (useTimestamps === false) {
            internalIgnoredFields = 'created_at,updated_at,';
        } else {
            internalIgnoredFields = '';
        }

        internalIgnoredFields += ignoreFields;

        for (var i = 0; i <= tableField.length - 1; i++) {
            if (!internalIgnoredFields.includes(tableField[i]["column_name"]))
                columns += separador + tableField[i]["column_name"];
            if (columns != '' && separador === '')
                separador = ',';
        }

        return columns;

    },

    async validarEmailCadastroUsuario(email) {

        const internalEmail = email || '';

        const usuario = await connection('usuario')
            .where('email', internalEmail)
            .select();

        if (usuario.length === 0) {
            return false;
        }

        if (usuario[0]['id'] > 0) {
            return true;
        } else {
            return false;
        }

    }

}