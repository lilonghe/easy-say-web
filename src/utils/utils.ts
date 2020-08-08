export function tranTextColor(text: any) {
    let str = '';
    for (let i = 0; i < text.length; i++) {
        str += parseInt(text[i].charCodeAt(0), 10).toString(16);
    }
    return '#' + str.slice(1, 4);
}