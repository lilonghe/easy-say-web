import styles from "./message.module.styl";
import {tranTextColor} from "@/utils/utils";
import FavoritesIcon from "@/components/icons/favorites";
import CommentsIcon from "@/components/icons/comments";
import React from "react";
import Message from "@/models/message";
import {inject, observer} from "mobx-react";
import { dateFormat } from '@/utils/utils';

interface IProps {
    item: Message;
    likeItem(item: Message): void;
    showComment(item: Message): void;
    postMessageComment(message_id: string): void;
    changeSendCommentText(e: React.ChangeEvent<HTMLInputElement>, message_id: string): void;
}

@inject("home")
@observer
export default class MessageComponent extends React.PureComponent<IProps, {}> {
    render() {
        const { item, likeItem, showComment, changeSendCommentText, postMessageComment } = this.props;
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
                <div className={styles.cTime}>{dateFormat(item.created_at)}</div>
                <span onClick={()=>likeItem(item)}><FavoritesIcon color={item.liked ? 'red' : '#AAA'} />{item.like_count}</span>
                <span onClick={()=>showComment(item)}><CommentsIcon color={'#AAA'}/>{item.comment_count}</span>
            </div>

            {item.showComment && <div className={styles.commentsWrapper}>
                <div className={styles.sendCommentWrapper}>
                    <input value={item.commentText} onChange={e=>changeSendCommentText(e,item.id)} className={styles.sendCommentInput} />
                    <input onClick={()=>postMessageComment(item.id)} className={styles.sendCommentBtn} type='button' value='发布'/>
                </div>
                <ul>
                    {item.comments && item.comments.map(comment=><li className={styles.commentItem} key={comment.id}>
                        <span className={styles.commentUserName}>{comment.user.nickname}:</span>
                        <span>{comment.content}</span>
                    </li>)}
                </ul>
            </div>}
        </div>
    }
}