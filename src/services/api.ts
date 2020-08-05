import request, { RequestOption } from '@/utils/request';

export function login(params: object) {
    let option: RequestOption = { method: 'post', params };
    return request('login', option);
}

export function home(params: object) {
    let option: RequestOption = { params };
    return request('home', option);
}

export function postMessage(params: object) {
    let option: RequestOption = { method: 'post', params };
    return request('message', option);
}