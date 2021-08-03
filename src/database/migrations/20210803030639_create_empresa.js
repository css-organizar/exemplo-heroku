
exports.up = function(knex) {
    return knex.schema.createTable('empresa', function (table) {
        table.increments('id').primary();
        table.timestamps('data_cadastro');
        table.string('razao_social');
        table.string('nome_fantasia');
        table.string('tipo');
        table.string('cpf_cnpj');
        table.string('email');
        table.string('telefone');
        table.string('senha');
      }) 
};

exports.down = function(knex) {
    knex.schema.dropTable('empresa');
};
