import { Subjects } from './subjects';

export interface PostLikedEvent {
  subject: Subjects.PostLiked;
  data: {
    postId: string;
    userId: string;
  };
}
