import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";
it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets/new").send({});
  expect(response.status).not.toEqual(404);
});

it("only access if user is signed in", async () => {
  await request(app).post("/api/tickets/new").send({}).expect(401);
});

it("return status other than 401 if user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets/new")
    .set("Cookie", signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("return error when invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets/new")
    .set("Cookie", signin())
    .send({ title: "", price: 10 })
    .expect(400);
  await request(app)
    .post("/api/tickets/new")
    .set("Cookie", signin())
    .send({ price: 10 })
    .expect(400);
});

it("returns error if invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets/new")
    .set("Cookie", signin())
    .send({ title: "New title", price: -10 })
    .expect(400);
  await request(app)
    .post("/api/tickets/new")
    .set("Cookie", signin())
    .send({ title: "New title" })
    .expect(400);
});

it("create a ticket if valid input is provided", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
    .post("/api/tickets/new")
    .set("Cookie", global.signin())
    .send({ title: "New Title", price: 10 })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
