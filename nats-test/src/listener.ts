import { ticketCreatedListner } from "./events/ticketCreatedListener";

import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const id = randomBytes(4).toString("hex");

const stan = nats.connect("ticketing", id, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  new ticketCreatedListner(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
