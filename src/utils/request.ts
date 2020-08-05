import 'whatwg-fetch';

const host: string = "http://rap2.taobao.org:38080/app/mock/262830/";

export default function request(url: string, params: object) {
    return fetch(host + url, params).
        then(res=>res.json());
}