exports.seed = function(knex) {
    return knex('usuario_perfil')
        .then(function() {
            const dataAtual = new Date();
            return knex('usuario_perfil')
                .insert([{
                        id: 1,
                        descricao: 'administrador'
                    },
                    {
                        id: 2,
                        descricao: 'usuario'
                    }
                ])
                .onConflict('id')
                .merge();
        });
};