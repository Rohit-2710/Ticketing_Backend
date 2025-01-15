import { Listener } from "../../../common/src/events/baseListener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "../../../common/src/events/ticketCreatedEvents";
import { Subjects } from "../../../common/src/events/subjects";

class ticketCreatedListner extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);

    msg.ack();
  }
}

export { ticketCreatedListner };
