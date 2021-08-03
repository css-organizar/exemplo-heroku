exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('usuario')
        // .del()
        .then(function() {
            // Inserts seed entries
            const dataAtual = new Date();
            return knex('usuario').insert([{
                    id: 1,
                    created_at: dataAtual,
                    updated_at: dataAtual,
                    nome: 'administrador',
                    email: 'administrador@gmail.coom',
                    telefone: '+5527999677326',
                    senha: '123456',
                    status: true
                }])
                .onConflict('id', 'email')
                .ignore();
        });
};