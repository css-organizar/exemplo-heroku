exports.up = function(knex) {
    return knex.schema.createTable('vendedor', function(table) {
        table.increments('id').primary();
        table.timestamps('data_cadastro');
        table.string('nome');
        table.string('email');
        table.string('telefone');
        table.string('senha');
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('vendedor');
};