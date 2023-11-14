import { Subjects } from './subjects';

export interface PostCreatedEvent {
  subject: Subjects.TopicCreated;
  data: {
    id: string;
    userId: string;
    title: string;
  };
}
