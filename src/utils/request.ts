import 'whatwg-fetch';
import qs from 'query-string';

// const host: string = "http://rap2.taobao.org:38080/app/mock/262830/";
const host: string = "http://127.0.0.1:8080/api/";

export class RequestOption {
    body?: string;
    method?: string = 'get';
    params?: object;
    credentials?: RequestCredentials =  'include';
    headers?: any;
}

export default function request(url: string, option?: RequestOption) {
    if (!option) {
        option = new RequestOption();
    }
    if (option.params) {
        if (!option.method || option.method?.toLowerCase() === 'get') {
            url += "?" + qs.stringify(option.params);
        } else {
            option.body = JSON.stringify(option.params);
        }
    }

    if (!option.credentials) {
        option.credentials = 'include';
    }
    if (!option.headers) {
        option.headers = {};
    }
    option.headers['Content-Type'] = 'application/json; charset=utf-8';

    return fetch(host + url, option).
        then(checkStatus).
        then((res: Response)=>res.json()).then((data: any)=>{
            if (data.err) {
                alert(data.err);
            }
            return data;
    });
}

function checkStatus(response: Response) {
    if (response.status === 401) {
        window.location.href = "/login";
    }
    return response;
}
