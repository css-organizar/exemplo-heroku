var crypto = require("crypto");

exports.seed = function(knex) {
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
        });
};