import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets/new").send({});
  expect(response.status).not.toEqual(404);
});

it("only access if user is signed in", async () => {
  await request(app).post("/api/tickets/new").send({}).expect(401);
});

it("return error when invalid title is provided", async () => {});

it("returns error if invalid price is provided", async () => {});

it("create a ticket if valid input is provided", async () => {});
