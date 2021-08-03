
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usuario').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuario').insert([
        {
          id: 1,
          nome: 'Claudney Sarti Sessa',
          email: 'claudneysartisessa@gmail.coom',
          senha: 'Css#20151984'
        }
      ]);
    });
};
