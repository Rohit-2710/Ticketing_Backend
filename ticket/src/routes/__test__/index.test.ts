import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";

const createTicket = async () =>
  request(app)
    .post("/api/tickets/new")
    .set("Cookie", global.signin())
    .send({ title: "concert", price: 20 });
it("return 200 and can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  const response = await request(app).get("/api/tickets").send().expect(200);
  expect(response.body.length).toEqual(3);
});
