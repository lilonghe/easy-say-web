import { observable, action } from 'mobx';
import * as req  from '@/services/api';

class User {
    openid: string;
    nickname: string;

    constructor(openid: string, nickname: string) {
        this.openid = openid;
        this.nickname = nickname;
    }
}

class Session {
    @observable
    user!: User;

    @action
    login = async (params: object) => {
        let { err, data } = await req.login(params);
        if (!err) {
            this.user = data;
        }
        return err;
    }
}

const session = new Session();
export default session;