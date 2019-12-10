
exports.up = function(knex, Promise) {
    //função que cria a tabela e recebe via callback as colunas
    return knex.schema.createTable('users', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
    })
};

//fazer o contrário no DOWN
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
