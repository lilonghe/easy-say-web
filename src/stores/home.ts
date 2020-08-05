import { observable, action } from 'mobx';
import * as req  from '@/services/api';
import Message from '@/models/message';

class Home {
    @observable
    messageList: Message[] = [];

    @observable
    total: number = 0;

    @observable
    page: number = 1;

    @action
    getMessageList = async (params: object) => {
        let { err, data } = await req.home(params);
        if (!err) {
            this.messageList = data.nodes;
        }
        return err;
    }
}

const home = new Home();
export default home;