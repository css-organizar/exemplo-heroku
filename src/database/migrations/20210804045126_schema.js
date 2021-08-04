exports.up = function(knex) {
    return knex.schema.createTable('usuario', function(table) {

        table
            .increments('id')
            .comment("Identificador do Registro")
            .primary();

        table
            .string('nome')
            .comment("Nome do Usuário");

        table
            .string('email')
            .comment("Endereço de Correio Eletrônico");

        table
            .string('telefone')
            .comment("Telefone de Contato");

        table
            .string('senha')
            .comment("Senha de Acesso");

        table
            .boolean('status')
            .comment("Status do Usuário")
            .defaultTo(false);

    })
};

exports.down = function(knex) {
    knex.schema.dropTable('usuario')
};