import React from "react";
import { inject, observer} from 'mobx-react';
import { Redirect } from 'react-router-dom';
import styles from './login.module.styl';
import GithubIcon from '@/components/icons/github';
import qs from 'query-string';
import * as req from '@/services/api';

interface IState {
    username: string;
    password: string;
}

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

    componentDidMount(): void {
        this.autoLogin();
    }

    autoLogin = async () => {
        let params = qs.parse(window.location.search);
        let code = params['code'];
        if (code) {
            let {err} = await req.authGithub({code})
            if (!err) {
                this.props.session.getUserInfo();
            }
        }
    }

    login = async () => {
        const { username, password } = this.state;
        if (!username || !password) return;

        const {session} = this.props;
        await session.login({ username, password });
    }

    goGithub = () => {
        window.location.href = `https://github.com/login/oauth/authorize?scopes=read:user,user:email&client_id=7d77e8a92d08d278549d&redirect_uri=${encodeURIComponent(window.location.origin+window.location.pathname+"?channel=github")}`;
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
            <div>
                <span onClick={this.goGithub}><GithubIcon /></span>
            </div>
        </div>
    }
}