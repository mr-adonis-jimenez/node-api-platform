const assert = require('assert');
const request = require('supertest');
const app = require('../index');
const { resetUsers } = require('../routes/userRoutes');

describe('Health Check', function () {
  it('GET /health should return status ok', async function () {
    const res = await request(app).get('/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'ok');
    assert.ok(res.body.timestamp);
    assert.ok(typeof res.body.uptime === 'number');
  });
});

describe('Users API', function () {
  beforeEach(function () {
    resetUsers();
  });

  describe('POST /api/users', function () {
    it('should create a new user', async function () {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'john@example.com' });

      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.name, 'John Doe');
      assert.strictEqual(res.body.email, 'john@example.com');
      assert.ok(res.body.id);
      assert.ok(res.body.createdAt);
    });

    it('should return 400 if name is missing', async function () {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'john@example.com' });

      assert.strictEqual(res.status, 400);
      assert.ok(res.body.error);
    });

    it('should return 400 if email is missing', async function () {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe' });

      assert.strictEqual(res.status, 400);
      assert.ok(res.body.error);
    });
  });

  describe('GET /api/users', function () {
    it('should return empty array when no users', async function () {
      const res = await request(app).get('/api/users');
      assert.strictEqual(res.status, 200);
      assert.deepStrictEqual(res.body, []);
    });

    it('should return all users', async function () {
      await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'john@example.com' });

      const res = await request(app).get('/api/users');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.length, 1);
    });
  });

  describe('GET /api/users/:id', function () {
    it('should return a user by id', async function () {
      const createRes = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'john@example.com' });

      const res = await request(app).get(`/api/users/${createRes.body.id}`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.name, 'John Doe');
    });

    it('should return 404 for non-existent user', async function () {
      const res = await request(app).get('/api/users/999');
      assert.strictEqual(res.status, 404);
    });
  });

  describe('PUT /api/users/:id', function () {
    it('should update a user', async function () {
      const createRes = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'john@example.com' });

      const res = await request(app)
        .put(`/api/users/${createRes.body.id}`)
        .send({ name: 'Jane Doe', email: 'jane@example.com' });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.name, 'Jane Doe');
      assert.strictEqual(res.body.email, 'jane@example.com');
    });

    it('should return 404 for non-existent user', async function () {
      const res = await request(app)
        .put('/api/users/999')
        .send({ name: 'Jane Doe' });
      assert.strictEqual(res.status, 404);
    });
  });

  describe('DELETE /api/users/:id', function () {
    it('should delete a user', async function () {
      const createRes = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'john@example.com' });

      const res = await request(app).delete(`/api/users/${createRes.body.id}`);
      assert.strictEqual(res.status, 204);

      const getRes = await request(app).get(`/api/users/${createRes.body.id}`);
      assert.strictEqual(getRes.status, 404);
    });

    it('should return 404 for non-existent user', async function () {
      const res = await request(app).delete('/api/users/999');
      assert.strictEqual(res.status, 404);
    });
  });
});
