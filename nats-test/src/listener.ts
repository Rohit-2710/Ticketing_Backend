import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const id = randomBytes(4).toString("hex");

const stan = nats.connect("ticketing", id, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("order-service");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const subscription = stan.subscribe(
    "ticket:created",
    "queue-group-name",
    options
  );
  subscription.on("message", (msg) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
