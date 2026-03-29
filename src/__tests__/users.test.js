import request from "supertest";
import app from "../app.js";
import { resetUsers } from "../routes/userRoutes.js";

beforeEach(() => {
  resetUsers();
});

describe("GET /health", () => {
  it("should return health status", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body).toHaveProperty("uptime");
    expect(res.body).toHaveProperty("timestamp");
  });
});

describe("GET /api/users", () => {
  it("should return all seeded users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveLength(2);
  });
});

describe("GET /api/users/:id", () => {
  it("should return a user by id", async () => {
    const res = await request(app).get("/api/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("John Doe");
  });

  it("should return 404 for non-existent user", async () => {
    const res = await request(app).get("/api/users/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("error");
  });

  it("should return 400 for invalid id", async () => {
    const res = await request(app).get("/api/users/abc");
    expect(res.statusCode).toBe(400);
  });
});

describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Alice Wonder", email: "alice@example.com" });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe("Alice Wonder");
    expect(res.body.data.email).toBe("alice@example.com");
    expect(res.body.data).toHaveProperty("id");
  });

  it("should reject missing name", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ email: "no-name@example.com" });
    expect(res.statusCode).toBe(400);
  });

  it("should reject invalid email", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Bad Email", email: "not-an-email" });
    expect(res.statusCode).toBe(400);
  });

  it("should reject duplicate email", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Dup User", email: "john@example.com" });
    expect(res.statusCode).toBe(409);
  });
});

describe("PUT /api/users/:id", () => {
  it("should update a user", async () => {
    const res = await request(app)
      .put("/api/users/1")
      .send({ name: "John Updated" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("John Updated");
  });

  it("should return 404 for non-existent user", async () => {
    const res = await request(app)
      .put("/api/users/999")
      .send({ name: "Nobody" });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete a user", async () => {
    const res = await request(app).delete("/api/users/1");
    expect(res.statusCode).toBe(204);

    const check = await request(app).get("/api/users");
    expect(check.body.data).toHaveLength(1);
  });

  it("should return 404 for non-existent user", async () => {
    const res = await request(app).delete("/api/users/999");
    expect(res.statusCode).toBe(404);
  });
});

describe("404 handler", () => {
  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/api/nonexistent");
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("error");
  });
});
