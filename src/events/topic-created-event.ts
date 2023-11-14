import { Subjects } from './subjects';

export interface TopicCreatedEvent {
  subject: Subjects.TopicCreated;
  data: {
    id: string;
    userId: string;
    title: string;
  };
}
