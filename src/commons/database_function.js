const connection = require('../database/connection');

module.exports = {
    async getListOfTableColumns(tableName, ignoreFields) {
        const tableField = await connection('information_schema.columns')
            .select('column_name')
            .where("table_name", tableName)
            .returning('column_name');

        var columns = '';
        var separador = '';

        for (var i = 0; i <= tableField.length - 1; i++) {
            if (!ignoreFields.includes(tableField[i]["column_name"]))
                columns += separador + tableField[i]["column_name"];
            separador = ',';
        }

        return columns;
    }
}