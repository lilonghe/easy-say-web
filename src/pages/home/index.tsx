import React from "react";
import {inject, observer} from "mobx-react";
import Message from '@/models/message';
import styles from './home.module.styl';
import {tranTextColor} from "@/utils/utils";
import FavoritesIcon from "@/components/icons/favorites";
import CommentsIcon from "@/components/icons/comments";
import MessageComponent from "@/components/message";

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
            <div className={styles.messageSend}>
                <textarea value={sendText} onChange={this.changeSendInfo} className={styles.sendInput} />
                <input onClick={this.postMessage} className={styles.sendBtn} type='button' value='发布'/>
            </div>
            {messageList.slice().map((item: Message)=><MessageComponent
                key={item.id}
                postMessageComment={this.postMessageComment}
                changeSendCommentText={this.changeSendCommentText}
                item={item} likeItem={this.likeItem} showComment={this.showComment} />)}
            </div>
        </div>
    }
}
{/*<MessageComponent key={item.id} item={item} likeItem={this.likeItem} showComment={this.showComment} />*/}