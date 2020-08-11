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
        let {err, data} = await req.home({page: this.page});
        if (!err) {
            this.messageList = data.map((item:Message)=>{
                item.comments = [];
                return item;
            });
        }
        return err;
    }

    @action
    postMessage = async () => {
        if (!this.sendText) return;
        if (this.submitting) return;

        this.submitting = true;
        let {err} = await req.postMessage({content: this.sendText});
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

    @action
    likeMessage = async (message: Message, unlike: boolean) => {
        let {err} = await req.likeMessage({message_id: message.id, unlike});
        if (!err) {
            this.messageList.map((item, i) => {
                if (item.id == message.id) {
                    this.messageList[i].liked = !unlike;
                    this.messageList[i].like_count += (unlike ? -1 : 1);
                }
            })
        }
    }

    @action
    getMessageComments = async (message_id: string, hiddenCommit: boolean) => {
        let i = this.messageList.findIndex(item => item.id === message_id);

        if (hiddenCommit) {
            this.messageList[i].showComment = false;
        } else {
            if (this.messageList[i].comments?.length === 0 && this.messageList[i].comment_count !== 0 ||
                (this.messageList[i].comments?.length>0 && this.messageList[i].comments?.length!==this.messageList[i].comment_count)) {
                let {err, data} = await req.getMessageComments({message_id});
                if (!err) {
                    this.messageList[i].comments = data.list;
                }
            }
            this.messageList[i].showComment = true;
        }
    }

    @action
    postMessageComment = async (message_id: string) => {
        let i = this.messageList.findIndex(item => item.id === message_id);
        let msg = this.messageList[i];
        let {err} = await req.postMessageComment({ message_id, content: msg?.commentText });
        if (!err) {
            this.messageList[i].commentText = "";
            this.messageList[i].comment_count++;
            this.getMessageComments(msg.id, false);
        }

        return err;
    }

    @action
    changeCommentSendText = (val: string, message_id: string) => {
        let i = this.messageList.findIndex(item => item.id === message_id);
        this.messageList[i].commentText = val;
    }
}

const home = new Home();
export default home;