exports.up = function(knex) {
    return knex.schema.createTable('tab1', function(table) {

            table
                .increments('id')
                .comment("Identificador do Registro")
                .primary();

        })
        .createTable('tab2', function(table) {

            table
                .increments('id')
                .comment("Identificador do Registro")
                .primary();

        })
        .createTable('tab3', function(table) {

            table
                .increments('id')
                .comment("Identificador do Registro")
                .primary();

        })
        .createTable('tab4', function(table) {

            table
                .increments('id')
                .comment("Identificador do Registro")
                .primary();

        })
};

exports.down = function(knex) {

};