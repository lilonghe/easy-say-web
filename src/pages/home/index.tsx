import React from "react";
import {inject, observer} from "mobx-react";
import Message from '@/models/message';
import styles from './home.module.styl';

class IState {
    sendText: string = '';
}

@inject("home")
@observer
export default class Home extends React.PureComponent<any, IState> {
    state = {
        sendText: ''
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
                    <img className={styles.avatar} src={item.user.avatar} />
                    <div>
                        <span className={styles.nickname}>{item.user.nickname}</span>
                        <p className={styles.briefIntro}>{item.user.briefIntro}</p>
                    </div>
                </div>
                <div className={styles.content}>
                    {item.content}
                </div>
                <div className={styles.interactive}>
                    <span>like: {item.likeCount}</span>
                    <span>comment: {item.commentCount}</span>
                    {/*<span>repost: {item.repostCount}</span>*/}
                </div>
            </div>)}
            </div>
        </div>
    }
}