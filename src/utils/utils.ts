export function tranTextColor(text: any) {
    let str = '';
    for (let i = 0; i < text.length; i++) {
        str += parseInt(text[i].charCodeAt(0), 10).toString(16);
    }
    return '#' + str.slice(1, 4);
}

export function dateFormat(time:any, format = "yyyy-MM-dd HH:mm:ss") {
    let initTime = "1970-01-01T08:00:00+08:00";

    if (!time || time == initTime || time == "0001-01-01T00:00:00Z") {
        return "";
    }
    if (typeof time == "string") {
        time = new Date(time);
    }

    if (typeof time == "object") {
        if (time.seconds) {
            let d = new Date(initTime);

            d.setSeconds(time.seconds);
            time = d;
        }
    }

    var t = time;
    var tf = function(i: number) {
        return (i < 10 ? "0" : "") + i;
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss|ms/g, function (a): string {
        switch (a) {
            case "yyyy":
                return tf(t.getFullYear());
                break;
            case "MM":
                return tf(t.getMonth() + 1);
                break;
            case "mm":
                return tf(t.getMinutes());
                break;
            case "dd":
                return tf(t.getDate());
                break;
            case "HH":
                return tf(t.getHours());
                break;
            case "ss":
                return tf(t.getSeconds());
            case "ms":
                return tf(t.getMilliseconds());
                break;
        }
        return "";
    });
}