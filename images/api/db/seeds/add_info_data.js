/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  const users = await knex("info").select("*");
  if(users.length == 0) {
      // Inserts seed entries
      return knex('info').insert([
        { infoName: 'Attila-Info', description: 'Attila test' },
        { infoName: 'Jens-Info', description: 'Jens test' },
        { infoName: 'Mehdi-Info', description: 'Mehdi test' }
      ]);
    };
};
