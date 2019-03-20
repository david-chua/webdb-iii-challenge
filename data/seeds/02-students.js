
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'James', cohort_id: 1},
        {name: 'Jackson', cohort_id: 2},
        {name: 'Peter', cohort_id:1},
        {name: 'Max', cohort_id: 3},
        {name: 'Sam', cohort_id: 2},
        {name: 'Harry', cohort_id:3}
      ]);
    });
};
