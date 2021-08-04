exports.up = function(knex) {
    return knex.schema.table('usuario', function(table) {

        // Doesn't work
        knex.schema.hasColumn('usuario', 'recovery').then(function(exists) {
            if (exists) {
                table.dropColumn('recovery');
            }
        });
    });
};

exports.down = function(knex) {

};