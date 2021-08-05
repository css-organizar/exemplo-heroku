exports.up = function(knex) {
    return knex.schema
        .createTable('system', function(table) {

            table
                .timestamps(true, true);

            table
                .increments('id')
                .comment("Identificador do Registro")
                .primary();

            table
                .string('application_token')
                .comment("Token de Identificação da Empresa")
                .unique();

            table
                .string('razao_social')
                .comment("Nome ou Razão Social da Pessoa Vinculada");

            table
                .string('cpf_cnpj')
                .comment("CPF/CNPJ da Pessoa Vinculada");

            table
                .dateTime('data_bloqueio', { precision: 6 })
                .defaultTo(knex.fn.now());

        })
        .createTable('configuracoes', function(table) {

            table
                .timestamps(true, true);

            table
                .increments('id')
                .comment("Identificador do Registro")
                .primary();

            table
                .string('cpf_cnpj')
                .comment("CPF/CNPJ da Pessoa Vinculada");

            table
                .string('instagram')
                .comment("Link do Perfil no Instagram");

            table
                .string('whatsapp')
                .comment("Telefone Vinculado ao Whatsapp");

            table
                .string('email')
                .comment("E-mail de contato");

        })
        .createTable('usuario_perfil', function(table) {

            table
                .timestamps(true, true);

            table
                .increments('id')
                .comment("Identificador do Registro")
                .primary();

            table
                .string('descricao')
                .comment("Descrição do Perfil do usuário");

        })
        .createTable('usuario', function(table) {

            table
                .timestamps(true, true);

            table
                .increments('id')
                .comment("Identificador do Registro")
                .primary();

            table
                .integer('usuario_perfil_id')
                .comment("Identificador do Registro")
                .defaultTo(2);

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

            table
                .foreign("usuario_perfil_id")
                .references("id")
                .inTable("usuario_perfil");

        })
};

exports.down = function(knex) {
    knex.schema.dropTable('usuario')
};