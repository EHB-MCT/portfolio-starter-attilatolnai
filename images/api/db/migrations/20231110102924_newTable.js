/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('info', function(table) {
      table.increments('id').primary();
      table.string('infoName').notNullable();
      table.string('description').notNullable();
      table.integer('user_id').unsigned(); // Foreign key column

      table.foreign('user_id').references('id').inTable('users');
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('info');
  };
