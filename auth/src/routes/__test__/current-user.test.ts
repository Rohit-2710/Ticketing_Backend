import request from "supertest";
import { app } from "../../app";

it("response with details about current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/user/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("rohit@gmail.com");
});

it("response with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/user/currentuser")
    .send()
    .expect(401);
  expect(response.body.currentUser).toEqual(undefined);
});
