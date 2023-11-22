/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  const users = await knex("users").select("*");
  if(users.length == 0) {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'Attila', password: 'passwoord' },
        { username: 'Jens', password: 'password2' },
        { username: 'Mehdi', password: 'password3' }
      ]);
    };
};

