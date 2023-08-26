/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('party', (table) => {
    table.uuid('party_id').primary();
    table.string('email').notNullable().unique();
    table.string('party_name').notNullable();
    table.string('password').notNullable();
    table.integer('prosperity_points');
    table.integer('reputation');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('party');
};
