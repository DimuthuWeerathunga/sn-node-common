import { Subjects } from './subjects';

export interface TopicLikeddEvent {
  subject: Subjects.TopicLiked;
  data: {
    topicId: string;
    userId: string;
  };
}
