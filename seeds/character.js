/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('character').insert([
    {
      party_id: 1,
      class: "brute",
      character_name: "Steph",
      exp: 1,
      gold: 20,
      perks: 2
    },
  ]);
};
