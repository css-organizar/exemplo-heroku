var crypto = require("crypto");

exports.seed = function(knex) {
    return knex('system')
        .then(function() {
            var application_token = crypto.randomBytes(32).toString('hex');
            var expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 90);

            console.log(expirationDate);

            return knex('system').insert([{
                    application_token: application_token,
                    expiration: expirationDate
                }])
                .onConflict('application_token')
                .ignore();
        });
};