import { Subjects } from './subjects';
export interface PostCreatedEvent {
    subject: Subjects.TopicLiked;
    data: {
        topicId: string;
        userId: string;
    };
}
