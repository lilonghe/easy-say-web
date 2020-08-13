import React from 'react';
import ReactDOM from "react-dom";
import styles from './notification.module.styl';
import CloseIcon from '@/components/icons/close';

class NotificationComponent extends React.PureComponent<any, {}> {

    close = () => {
        const { id } = this.props;
        document.getElementById(id)?.remove();
    }

    render() {
        const { params: { content } } = this.props;
        return <div className={styles.notificationWrapper}>
            <CloseIcon onClick={this.close} className={styles.closeIcon} />
            <div>{content}</div>
        </div>
    }
}


export default function notification(params?: any) {
    let ele = document.createElement("div")
    ele.id = Math.random()+"";
    document.body.append(ele);
    ReactDOM.render(<NotificationComponent id={ele.id} params={params} />,document.getElementById(ele.id));

    if (params.timeout !== 0) {
        setTimeout(() => {
            document.getElementById(ele.id)?.remove();
        }, 3000);
    }
}
