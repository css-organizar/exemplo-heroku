exports.seed = function(knex) {
    return knex('configuracoes')
        .then(function() {
            return knex('configuracoes')
                .insert([{
                    id: 1
                }])
                .onConflict('id')
                .merge();
        });
};