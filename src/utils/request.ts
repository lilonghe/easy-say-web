import 'whatwg-fetch';
import qs from 'query-string';

const host: string = "http://rap2.taobao.org:38080/app/mock/262830/";

export class RequestOption {
    body?: string;
    method?: string = 'get';
    params?: object;
}

export default function request(url: string, option: RequestOption) {
    if (option.params) {
        if (!option.method || option.method?.toLowerCase() === 'get') {
            url += "?" + qs.stringify(option.params);
        } else {
            option.body = JSON.stringify(option.params);
        }
    }

    return fetch(host + url, option).
        then(res=>res.json());
}
