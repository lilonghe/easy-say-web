import styles from "./message.module.styl";
import {tranTextColor} from "@/utils/utils";
import FavoritesIcon from "@/components/icons/favorites";
import CommentsIcon from "@/components/icons/comments";
import React from "react";
import Message from "@/models/message";

interface IProps {
    item: Message;
    likeItem(item: Message): void;
    showComment(item: Message): void;
}

export default function(props: IProps) {
    const { item, likeItem, showComment } = props;
    console.log(item);
    return <div key={item.id} className={styles.message}>
        <div className={styles.userinfo}>
            <span className={styles.avatar} style={{backgroundColor: tranTextColor(item.user.nickname)}}>{item.user.nickname[0]}</span>
            <div>
                <span className={styles.nickname}>{item.user.nickname}</span>
                <p className={styles.briefIntro}>{item.user.brief_intro}</p>
            </div>
        </div>
        <div className={styles.content}>
            {item.content.split("\n").map((val: string)=><><span>{val}</span><br/></>)}
        </div>
        <div className={styles.interactive}>
            <span onClick={()=>likeItem(item)}><FavoritesIcon color={item.liked ? 'red' : '#AAA'} />{item.like_count}</span>
            <span onClick={()=>showComment(item)}><CommentsIcon color={'#AAA'}/>{item.comment_count}</span>
        </div>

        {item.showComment && <div>
            <ul>
                {item.comments && item.comments.map(comment=><li key={comment.id}>
                    {comment.user.nickname}:
                    {comment.content}
                </li>)}
            </ul>
        </div>}
    </div>
}

