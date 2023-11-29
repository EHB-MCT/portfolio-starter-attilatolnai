/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  const users = await knex("users").select("*");
  if (users.length === 0) {
    // Seed the "users" table first if needed
    await knex('users').insert([
      { username: 'Attila', password: 'password1' },
      { username: 'Jens', password: 'password2' },
      { username: 'Mehdi', password: 'password3' }
    ]);
  }

  // Inserts seed entries for "info" table
  return knex('info').insert([
    { infoName: 'Attila-Info', description: 'Attila test', user_id: 1 },
    { infoName: 'Jens-Info', description: 'Jens test', user_id: 2 },
    { infoName: 'Mehdi-Info', description: 'Mehdi test', user_id: 3 }
    // Add more entries as needed
  ]);
};

/*

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

*/

