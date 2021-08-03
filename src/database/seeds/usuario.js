exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('usuario')
        .del()
        .then(function() {
            // Inserts seed entries
            const dataAtual = new Date();
            return knex('usuario').insert([{
                id: 1,
                created_at: dataAtual,
                updated_at: dataAtual,
                nome: 'Claudney Sarti Sessa',
                email: 'claudneysartisessa@gmail.coom',
                senha: 'Css#20151984',
                telefone: '+5527999677326'
            }]);
        });
};