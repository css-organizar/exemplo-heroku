exports.up = function(knex) {
    return knex.schema.alterTable('usuario', function(table) {

        table
            .string('recovery')
            .comment("Frase de recuperação de senha");

    })
};

exports.down = function(knex) {

};