import React from "react";
import {inject, observer} from "mobx-react";
import Message from '@/models/message';
import styles from './home.module.styl';
import {tranTextColor} from "@/utils/utils";
import FavoritesIcon from "@/components/icons/favorites";
import CommentsIcon from "@/components/icons/comments";

class IState {
    sendCommentText: string = '';
}

@inject("home")
@observer
export default class Home extends React.PureComponent<any, IState> {
    state: IState = {
        sendCommentText: '',
    }

    componentDidMount(): void {
        this.props.home.getMessageList();
    }

    changeSendInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.home.changeSendText(e.target.value);
    }

    postMessage = () => {
        this.props.home.postMessage();
    }

    likeItem = (item: Message) => {
        this.props.home.likeMessage(item, item.liked);
    }

    showComment = (item: Message) => {
        this.props.home.getMessageComments(item.id, item.showComment);
    }

    postMessageComment = (message_id: string) => {
        this.props.home.postMessageComment(message_id);
    }

    changeSendCommentText = (e: React.ChangeEvent<HTMLInputElement>, message_id: string) => {
        this.props.home.changeCommentSendText(e.target.value, message_id);
    }

    render() {
        const { home: { messageList, sendText } } = this.props;
        return <div>
            <div className={styles.messageList}>
            <div className={styles.message}>
                <textarea value={sendText} onChange={this.changeSendInfo} className={styles.sendInput} />
                <input onClick={this.postMessage} className={styles.sendBtn} type='button' value='发布'/>
            </div>
            {messageList.map((item: Message)=><div key={item.id} className={styles.message}>
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
                    <span onClick={()=>this.likeItem(item)}><FavoritesIcon color={item.liked ? 'red' : '#AAA'} />{item.like_count}</span>
                    <span onClick={()=>this.showComment(item)}><CommentsIcon color={'#AAA'}/>{item.comment_count}</span>
                </div>

                {item.showComment && <div className={styles.commentsWrapper}>
                <div className={styles.sendCommentWrapper}>
                    <input value={item.commentText} onChange={e=>this.changeSendCommentText(e,item.id)} className={styles.sendCommentInput} />
                    <input onClick={()=>this.postMessageComment(item.id)} className={styles.sendCommentBtn} type='button' value='发布'/>
                </div>
                <ul>
                    {item.comments && item.comments.map(comment=><li className={styles.commentItem} key={comment.id}>
                        <span className={styles.commentUserName}>{comment.user.nickname}:</span>
                        <span>{comment.content}</span>
                    </li>)}
                </ul>
                </div>}
            </div>)}
            </div>
        </div>
    }
}
{/*<MessageComponent key={item.id} item={item} likeItem={this.likeItem} showComment={this.showComment} />*/}