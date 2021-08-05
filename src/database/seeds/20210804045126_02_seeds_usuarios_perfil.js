/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

exports.seed = function(knex) {
    return knex('usuario_perfil')
        .then(function() {
            return knex('usuario_perfil')
                .insert([{
                        descricao: 'administrador'
                    },
                    {
                        descricao: 'usuario'
                    }
                ])
                .onConflict('id')
                .merge();
        });
};