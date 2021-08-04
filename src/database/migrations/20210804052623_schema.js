exports.up = function(knex) {
    return knex.schema.alterTable('usuario', function(table) {

        table
            .string('recovery')
            .alter();

    })
};

exports.down = function(knex) {

};