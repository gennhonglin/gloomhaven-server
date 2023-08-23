/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('character', (table) => {
        table.uuid('party_id').notNullable()
        .references('party_id')
        .inTable('party')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.string('class');
        table.string('character_name');
        table.integer('level');
        table.integer('exp');
        table.integer('gold');
        table.integer('perks');
        table.string('head_gear');
        table.string('body_gear');
        table.string('left_hand_gear');
        table.string('right_hand_gear');
        table.string('boots_gear');
        table.string('small_item_one');
        table.string('small_item_two');
        table.string('small_item_three');
        table.string('small_item_four');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('character');
};
