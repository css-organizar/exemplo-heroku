exports.up = function(knex) {
    return knex.schema.alterTable('usuario', function(table) {

        table
            .integer('recovery')
            .alter();

    })
};

exports.down = function(knex) {

};