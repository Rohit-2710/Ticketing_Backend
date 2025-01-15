import { Publisher } from "../../../common/src/events/basePublisher";
import { Subjects } from "../../../common/src/events/subjects";
import { TicketCreatedEvent } from "../../../common/src/events/ticketCreatedEvents";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;

  constructor(client: any) {
    super(client);
  }
}
