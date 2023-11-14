import { Subjects } from './subjects';
export interface UserFollowedUserEvent {
    subject: Subjects.UserFollowedUser;
    data: {
        followeeId: string;
        followerId: string;
    };
}
