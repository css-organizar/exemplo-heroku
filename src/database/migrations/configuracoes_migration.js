// exports.up = function(knex) {
//     return knex.schema.createTable(
//         'configuracoes',
//         function(table) {
//             table.increments('id').primary();
//             table.timestamps('data_cadastro');
//             table.string('nome');
//             table.string('email');
//             table.string('telefone');
//             table.string('senha');
//         })
// };

// exports.down = function(knex) {
//     knex.schema.dropTable('configuracoes');
// };