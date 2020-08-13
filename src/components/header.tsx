import React from 'react';
import styles from './header.module.styl';
import {inject, observer} from "mobx-react";

@inject("session")
@observer
export default class Header extends React.PureComponent<any, {}> {
    render() {
        const { session: { user } } = this.props;
        if (!user) return <></>
        return <div>
            <div className={styles.headerWrapper}>
                <img className={styles.avatar} src={user?.avatar} />
            </div>
        </div>
    }
}