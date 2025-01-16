import { Publisher, Subjects, TicketCreatedEvent } from "@tickets2710/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
