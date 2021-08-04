var crypto = require("crypto");

exports.seed = function(knex) {
    return knex('system')
        .then(function() {
            const application_token = crypto.randomBytes(32).toString('hex');
            return knex('system').insert([{
                    application_token: application_token
                }])
                .onConflict('application_token')
                .ignore();
        });
};