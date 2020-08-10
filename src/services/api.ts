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