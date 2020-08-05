class AvatarImage {
    thumbnailUrl!: string;
    smallPicUrl!: string;
    picUrl!: string;
}

class User {
    username!: string;
    screenName!: string;
    briefIntro!: string;
    avatarImage!: AvatarImage;
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