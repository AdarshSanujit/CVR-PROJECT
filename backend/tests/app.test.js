import request from "supertest"
import app from "../src/app";
describe("GET /", () => {
  test("should return API working", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("API working");
  });
});
