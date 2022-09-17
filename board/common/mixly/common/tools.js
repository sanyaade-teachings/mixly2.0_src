goog.provide('Mixly.Tools');
goog.require('Mixly.Config');

Mixly.Tools.messageDecode = (s) => {
    if (s) {
        try {
            let newStr = decodeURIComponent(s.replace(/_([0-9a-fA-F]{2})/gm, '%$1'));
            newStr = unescape(newStr.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'));
            return newStr;
        } catch (e) {
        }
    }
    return s;
}

Mixly.Tools.strToByte = (str) => {
    var len, c;
    len = str.length;
    var bytes = [];
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return new Int8Array(bytes);
}

Mixly.Tools.uint8ArrayToStr = (fileData) => {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        var convert = (fileData[i]).toString(16);
        if (convert.length % 2 == 1)
            convert = "0" + convert;
        dataString = dataString + " " + convert.toUpperCase();
    }

    return dataString;

}