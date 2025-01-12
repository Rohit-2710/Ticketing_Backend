import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/user/signup")
    .send({
      email: "rohit@gmail.com",
      password: "password",
    })
    .expect(201);
});

it("return a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/user/signup")
    .send({
      email: "rohit",
      password: "password",
    })
    .expect(400);
});

it("return a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/user/signup")
    .send({
      email: "rohit@gmail.com",
      password: "p",
    })
    .expect(400);
});

it("return a 400 on no email and password", async () => {
  return request(app).post("/api/user/signup").send({}).expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/user/signup")
    .send({
      email: "rohit@gmail.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/user/signup")
    .send({ email: "rohit@gmail.com", password: "password" })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/user/signup")
    .send({
      email: "rohit@gmail.com",
      password: "password",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
