const request = require('supertest');
const app = require('../app.js')

describe("POST /select", () => {
    describe("given a select", () => {
      test("should respond with a 200 status code", async () => {
        const response = await request(app)
          .post("/select")
          .send({
            "sel": ["first_name", "last_name"],
            "from": "guests"
          });
  
        expect(response.status).toBe(200);
      });
    });
  });
  

describe("GET /room", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .get("/roomss");
      expect(response.status).toBe(200);
    });
  });
  

