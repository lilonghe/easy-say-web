import request, { RequestOption } from '@/utils/request';

export function login(params: object) {
    let option: RequestOption = { method: 'post', params };
    return request('login', option);
}

export function getUserInfo() {
    return request('user');
}

export function home(params: object) {
    let option: RequestOption = { params };
    return request('message', option);
}

export function postMessage(params: object) {
    let option: RequestOption = { method: 'post', params };
    return request('message', option);
}

export function likeMessage(params: object) {
    let option: RequestOption = { method: 'post', params };
    return request('message/like', option);
}

export function getMessageComments(params: object) {
    let option: RequestOption = { params };
    return request('message/comment', option);
}

export function postMessageComment(params: object) {
    let option: RequestOption = { method: 'post', params };
    return request('message/comment', option);
}

export function authGithub(params: object) {
    let option: RequestOption = { params };
    return request('oauth/github', option);
}