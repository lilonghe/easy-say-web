import React from "react";
import { inject, observer} from 'mobx-react';
import session from "@/stores/session";
import { Redirect } from 'react-router-dom';
import styles from './login.module.styl';

interface IState {
    username: string;
    password: string;
}
// interface IProps {
//     session?: session;
// }

@inject("session")
@observer
export default class Login extends React.PureComponent<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    login = async () => {
        const { username, password } = this.state;
        if (!username || !password) return;

        const {session} = this.props;
        await session.login({ username, password });
    }

    render() {
        const { session: { user } } = this.props;
        if (user){
            return <Redirect to="/" />
        }
        return <div className={styles.loginWrapper}>
            <div className={styles.inputGroup}>
                {/*<label htmlFor={'username'}>Username:</label>*/}
                <input placeholder={'input username'} id={'username'} className={styles.input} onChange={e=>this.setState({ username: e.target.value })}/>
            </div>
            <div className={styles.inputGroup}>
                {/*<label htmlFor={'password'}>Password:</label>*/}
                <input placeholder={'input password'} id={'password'} className={styles.input} type='password' onChange={e=>this.setState({ password: e.target.value })}/>
            </div>
            <div className={styles.inputGroup}>
                <input type='button' value='登录' className={styles.input} onClick={this.login} />
            </div>
        </div>
    }
}