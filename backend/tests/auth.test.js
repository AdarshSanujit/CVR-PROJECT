import app from "../src/app.js";
import request from "supertest";
import mongoose from "mongoose";
import connectDB from "../src/db/db.js";

export const agent = request.agent(app);
export let testEmail;
export let id;


beforeAll(async () => {
  await connectDB();
  testEmail = `test${Date.now()}@gmail.com`;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {
  test("should return register user successfully", async () => {
    const response = await agent.post("/api/auth/register").send({
      name: "Test User",
      email: testEmail,
      password: "123456",
      department: "CSE",
      branch: "Computer Science",
      role: "senior",
      graduation_year: 2022,
      current_role: "dev",
      companyName: "google",
    });
    id=response.body.user._id
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User registered successfully");
  });
});

describe("POST /api/auth/login", () => {
  test("should return login successfully", async () => {
    const response = await agent.post("/api/auth/login").send({
      email: testEmail,
      password: "123456",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Login successful");
  });
});

describe("GET /api/auth/get-me", () => {
  test("should return user fetched successfully", async () => {
    const response = await agent.get("/api/auth/get-me");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("user fetched successfully");
  });
});
describe(`GET /api/auth/user/${id}`, () => {
  test("should return user fetched successfully", async () => {
    const response = await agent.get(`/api/auth/user/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("user fetched successfully");
  });
});
describe("PUT /api/auth/update-profile", () => {
  test("should return Profile updated successfully", async () => {
    const response = await agent.put("/api/auth/update-profile").send({
      name: "Aditya",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Profile updated successfully");
  });
});
describe("GET /api/auth/get-users", () => {
  test("should return  users fetched successfully", async () => {
    const response = await agent.get("/api/auth/get-users");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("users fetched successfully" || "No Users Found");
  });
});

// describe(`DELETE /api/auth/delete/${id}`, () => {
//   test("should return Logout successful", async () => {
//     const response = await agent.delete(`/api/auth/delete/${id}`);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.message).toBe("Account Deleted SuccessFully");
//   });
// });


// describe("GET /api/auth/logout", () => {
//   test("should return Account Deleted SuccessFully", async () => {
//     const response = await agent.get("/api/auth/logout");
//     expect(response.statusCode).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.message).toBe("Logout successful");
//   });
// });