import { Subjects } from './subjects';
export interface PostCreatedEvent {
    subject: Subjects.PostCreated;
    data: {
        id: string;
        topicId: string;
        userId: string;
        title: string;
        content: string;
    };
}
