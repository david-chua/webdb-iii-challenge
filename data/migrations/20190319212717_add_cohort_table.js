
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(table){
    table.increments('');
    table.text('name')
      .notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
