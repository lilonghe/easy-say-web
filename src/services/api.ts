import request from '@/utils/request';

export function login(params: object) {
    return request('login', params);
}

export function home(params: object) {
    return request('home', params);
}