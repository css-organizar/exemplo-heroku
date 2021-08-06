const crypto = require("crypto");
const md5 = require('md5');

exports.up = function(knex) {
    return knex('system')
        .then(function() {
            var application_token = crypto.randomBytes(32).toString('hex');
            var dataBloqueio = new Date();
            dataBloqueio.setDate(dataBloqueio.getDate() + 90);

            console.log(dataBloqueio);

            return knex('system').insert([{
                    id: 1,
                    application_token: application_token,
                    data_bloqueio: dataBloqueio
                }])
                .onConflict('id')
                .ignore();
        }),

        knex('configuracoes')
        .then(function() {
            return knex('configuracoes')
                .insert([{
                    id: 1
                }])
                .onConflict('id')
                .merge();
        }),

        knex('usuario_perfil')
        .then(function() {
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
        }),

        knex('usuario')
        .then(function() {
            return knex('usuario').insert([{
                    usuario_perfil_id: 1,
                    nome: 'administrador',
                    email: 'administrador@gmail.com',
                    telefone: '+5527999677326',
                    senha: md5('123456'),
                    status: true
                }, {
                    usuario_perfil_id: 1,
                    nome: 'supervisor',
                    email: 'supervisor@gmail.com',
                    telefone: '+5527999677326',
                    senha: md5('123456'),
                    status: true
                }])
                .onConflict('email')
                .ignore();
        });
};

exports.down = function(knex) {

};