import app from "../src/app.js";
import request from "supertest";
import mongoose from "mongoose";
import connectDB from "../src/db/db";
import { testEmail,id, agent } from "./auth.test";

let projectId
beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});


describe("POST /api/project/add-project", () => {
  test("should return Project added successfully", async () => {
    const response = await agent.post("/api/project/add-project").send({
      senior_profile_id: id,
      title: "Project 1",
      category: "dev",
      description: "good one",
    });
    projectId = response.body.project._id;
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Project added successfully");
  });
});
describe(`PUT /api/project/update-project/${projectId}`, () => {
  test("should return Project updated successfully", async () => {
    const response = await agent.put(`/api/project/update-project/${projectId} `).send({
      senior_profile_id: id,
      title: "Project 1",
      category: "dev",
      description: "good one",
    });
  
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Project updated successfully");
  });
});

describe(`GET /api/project/get-project/${projectId}`, () => {
  test("should return Project Fetched Successfully", async () => {
    const response = await agent
      .get(`/api/project/get-project/${projectId} `)
      

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Project Fetched Successfully");
  });
});
describe(`GET /api/project/get-projects}`, () => {
  test("should return Projects Fetched Successfully", async () => {
    const response = await agent.get(`/api/project/get-projects `);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Projects Fetched Successfully" || "No Project Created Yet",
    );
  });
});

// describe(`DELETE /api/project/delete-project/${projectId}`, () =>{
//   test("should return Project deleted successfully", async () => {
//     const response = await agent
//       .delete(`/api/project/delete-project/${projectId} `)
//       .send({
//         senior_profile_id: id,
//         title: "Project 1",
//         category: "dev",
//         description: "good one",
//       });
//     console.log(response.body);

//     projectId = response.body?.updatedProject?._id;
//     expect(response.statusCode).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.message).toBe("Project deleted successfully");
//   });
// });