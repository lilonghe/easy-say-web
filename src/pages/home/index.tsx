import React from "react";
import {inject, observer} from "mobx-react";
import Message from '@/models/message';
import styles from './home.module.styl';
import { tranTextColor } from '@/utils/utils';

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
                    {/*<img className={styles.avatar} src={item.user.avatar} />*/}
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
                    <span>like: {item.like_count}</span>
                    <span>comment: {item.comment_count}</span>
                </div>
            </div>)}
            </div>
        </div>
    }
}