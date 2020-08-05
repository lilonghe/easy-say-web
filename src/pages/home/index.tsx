import React from "react";
import {inject, observer} from "mobx-react";
import Message from '@/models/message';
import styles from './home.module.styl';

@inject("home")
@observer
export default class Home extends React.PureComponent<any, {}> {

    componentDidMount(): void {
        this.props.home.getMessageList();
    }

    render() {
        const { home: { messageList } } = this.props;
        return <div>
            <div className={styles.messageList}>
            {messageList.map((item: Message)=><div className={styles.message}>
                <div className={styles.userinfo}>
                    <img className={styles.avatar} src={item.user.avatarImage.thumbnailUrl} />
                    <div>
                        <span className={styles.nickname}>{item.user.screenName}</span>
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