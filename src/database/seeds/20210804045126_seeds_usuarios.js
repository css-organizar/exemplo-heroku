const md5 = require('md5');

exports.seed = function(knex) {
    return knex('usuario')
        .then(function() {
            const dataAtual = new Date();
            return knex('usuario').insert([{
                    id: 1,
                    usuario_perfil_id: 1,
                    nome: 'administrador',
                    email: 'administrador@gmail.com',
                    telefone: '+5527999677326',
                    senha: md5('123456'),
                    status: true
                }])
                .onConflict('id', 'email')
                .ignore();
        });
};