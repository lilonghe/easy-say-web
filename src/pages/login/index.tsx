import React from "react";
import { inject, observer} from 'mobx-react';
import session from "@/stores/session";
import { Redirect } from 'react-router-dom';

interface IState {
    name: string;
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
            name: '',
            password: '',
        }
    }

    login = async () => {
        const { name, password } = this.state;
        const {session} = this.props;
        let err = await session.login({ name, password });
    }

    render() {
        const { session: { user } } = this.props;
        if (user){
            return <Redirect to="/" />
        }
        return <>
            <div>
                <input onChange={e=>this.setState({ name: e.target.value })}/>
            </div>
            <div>
                <input type='password' onChange={e=>this.setState({ password: e.target.value })}/>
            </div>
            <button onClick={this.login}>登录</button>
        </>
    }
}