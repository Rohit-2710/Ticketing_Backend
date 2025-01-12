import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  await request(app)
    .post("/api/user/signup")
    .send({
      email: "rohit@gmail.com",
      password: "password",
    })
    .expect(201);
  const response = await request(app)
    .post("/api/user/signin")
    .send({
      email: "rohit@gmail.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("returns 401 if user not exist", async () => {
  return request(app)
    .post("/api/user/signin")
    .send({
      email: "rohit@gmail.com",
      password: "password",
    })
    .expect(400);
});

it("returns 400 if password is incorrect", async () => {
  await request(app)
    .post("/api/user/signup")
    .send({
      email: "rohit@gmail.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/user/signin")
    .send({
      email: "rohti@gmail.com",
      password: "sdfgsg",
    })
    .expect(400);
});
