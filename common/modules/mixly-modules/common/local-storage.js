(() => {

goog.require('Mixly');
goog.provide('Mixly.LocalStorage');

const { LocalStorage } = Mixly;
const { localStorage } = window;

LocalStorage.write = (key, str) => {
    if (localStorage)
        localStorage[key] = str;
}

LocalStorage.read = (key) => {
    if (localStorage && localStorage[key])
        return localStorage[key];
    return '';
}

LocalStorage.writeJson = (key, jsonObj, replace = true) => {
    if (!replace)
        jsonObj = { ...jsonObj, ...LocalStorage.readJson(key) };
    try {
        const jsonStr = JSON.stringify(jsonObj);
        LocalStorage.write(key, jsonStr);
    } catch (error) {
        console.log(error);
    }
}

LocalStorage.readJson = (key) => {
    const jsonStr = LocalStorage.read(key);
    try {
        return JSON.parse(jsonStr);
    } catch (error) {
        console.log(error);
        return null;
    }
}

})();