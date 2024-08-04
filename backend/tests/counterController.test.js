const request = require('supertest');
const app = require('../server');
const { resetCounter } = require('../controllers/counterController');

beforeEach(() => {
  resetCounter();
});

describe('GET /counter', () => {
  it('should return the initial counter value', async () => {
    const response = await request(app).get('/counter');
    expect(response.status).toBe(200);
    expect(response.body.counter).toBe(0);
  });
});

describe('POST /counter/increment', () => {
  it('should increment the counter', async () => {
    let response = await request(app).post('/counter/increment');
    expect(response.status).toBe(200);
    expect(response.body.counter).toBe(1);

    response = await request(app).post('/counter/increment');
    expect(response.status).toBe(200);
    expect(response.body.counter).toBe(2);
  });
});

