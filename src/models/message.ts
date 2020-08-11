class User {
    username!: string;
    nickname!: string;
    brief_intro!: string;
    avatar!: string;
}

class Comment {
    id!: string;
    content!: string;
    created_at!: string;
    user!: User;
}

class Message {
    id!: string;
    content!: string;
    created_at!: string;
    liked: boolean = false;
    like_count: number = 0;
    comment_count: number = 0;
    user!: User;
    comments: Comment[] = [];
    showComment: boolean = false;
    commentText!: string;
}

export default Message;