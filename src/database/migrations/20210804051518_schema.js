exports.up = function(knex) {
    return knex.schema.alterTable('usuario', function(table) {

        table
            .dropColumn('recovery');

    })
};

exports.down = function(knex) {

};