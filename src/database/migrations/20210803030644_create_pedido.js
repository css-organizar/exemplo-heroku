exports.up = function(knex) {
    return knex.schema.createTable('pedido', function(table) {
        table.increments('id').primary();
        table.timestamps('data_cadastro');
        table.integer('id_empresa').notNullable();
        table.integer('id_usuario').notNullable();
        table.integer('id_vendedor').notNullable();
        table.integer('id_cliente').notNullable();
        table.foreign('id_empresa').references('id').inTable('empresa');
        table.foreign('id_usuario').references('id').inTable('usuario');
        table.foreign('id_vendedor').references('id').inTable('vendedor');
        table.foreign('id_cliente').references('id').inTable('cliente');
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('pedido');
};