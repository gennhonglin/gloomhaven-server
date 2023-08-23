/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('party').insert([
    {
      party_id: 1,
      email: 'test@gmail.com',
      party_name: 'Tavern Revengers',
      password: 'password',
      prosperity: 1,
      reputation: 1
    },
  ]);
};
