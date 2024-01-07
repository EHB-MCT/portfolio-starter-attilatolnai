const request = require('supertest');
const app = require('../../app.js');
const knexfile = require('./../../../db/knexfile.js');
const db = require("knex")(knexfile);

describe('GET /users/:user_id', () => {
  
  beforeAll(async () => {
    await db.raw('BEGIN');
    
    await db('users').insert({ user_id: 1, username: 'Attila', password: 'password1'});
    //await db('users').insert({ user_id: 1, username: 'Attila', password: 'password1'});

  });

  afterAll(async () => {
    await db.destroy();
  });

  test('should return the correct user record', async () => {
    const user_id = 1;
    const response = await request(app).get(`/users/${user_id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', user_id);
    // Add more assertions based on your data model 
  });

  test('should return 404 for non-existent student', async () => {
    const nonExistentUserId = 999;

    const response = await request(app).get(`/students/${nonExistentUserId}`);

    expect(response.status).toBe(404);
  });
});

//await db('users').insert({ id: 1, username: 'Attila', password: 'password1'});