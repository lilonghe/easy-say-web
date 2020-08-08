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

    @observable
    sendText: string = '';

    @observable
    submitting: boolean = false;

    @action
    getMessageList = async () => {
        let { err, data } = await req.home({ page: this.page });
        if (!err) {
            this.messageList = data;
        }
        return err;
    }

    @action
    postMessage = async () => {
        if (!this.sendText) return;
        if (this.submitting) return;

        this.submitting = true;
        let { err } = await req.postMessage({ content: this.sendText });
        this.submitting = false;
        if (!err) {
            this.changeSendText('');
            this.getMessageList();
        }
        return err;
    }

    @action
    changeSendText = (val: string) => {
        this.sendText = val;
    }
}

const home = new Home();
export default home;