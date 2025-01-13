import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/tickets";

const generateMongoId = () => new mongoose.Types.ObjectId().toHexString();

it("returns 401 if user is not authenticated", async () => {
  await request(app)
    .patch(`/api/tickets/${generateMongoId()}`)
    .send({})
    .expect(401);
});

it("returns 404 if provided id does not exist", async () => {
  await request(app)
    .patch(`/api/tickets/${generateMongoId()}`)
    .set("Cookie", global.signin())
    .send({ title: "New Title", price: 20 })
    .expect(404);
});

it("returns 401 id user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets/new")
    .set("Cookie", global.signin())
    .send({ title: "concert", price: 20 });
  await request(app)
    .patch(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "New Title", price: 20 })
    .expect(401);
});

it("returns 400 if user provides invalid title or price", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets/new")
    .set("Cookie", cookie)
    .send({ title: "concert", price: 20 });
  await request(app)
    .patch(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);
  await request(app)
    .patch(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "concert", price: -20 })
    .expect(400);
});

it("user updates the ticket provided valid details", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets/new")
    .set("Cookie", cookie)
    .send({ title: "concert", price: 20 });
  const updatedTicket = await request(app)
    .patch(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "New Title", price: 100 })
    .expect(200);
  expect(updatedTicket.body.title).toEqual("New Title");
  expect(updatedTicket.body.price).toEqual(100);
});
