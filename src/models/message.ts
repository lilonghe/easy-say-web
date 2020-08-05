class User {
    username!: string;
    nickname!: string;
    briefIntro!: string;
    avatar!: string;
}

class Message {
    id!: string;
    type!: string;
    content!: string;
    shareCount: number = 0;
    repostCount: number = 0;
    createdAt!: string;
    liked: boolean = false;
    likeCount: number = 0;
    commentCount: number = 0;
    user!: User;
}

export default Message;