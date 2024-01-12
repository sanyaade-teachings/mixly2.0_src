goog.loadJs('common', () => {

goog.require('Mixly.Debug');
goog.provide('Mixly.Registry');

const { Debug } = Mixly;

class Registry {
    #registry_ = new Map();
    constructor() {
        this.reset();
    }

    reset() {
        this.#registry_.clear();
    }

    validate(keys) {
        if (!(keys instanceof Array)) {
            keys = [keys];
        }
        return keys;
    }

    register(keys, value) {
        keys = this.validate(keys);
        for (let key of keys) {
            if (this.#registry_.has(key)) {
                Debug.warn(`${key}已存在，不可重复注册`);
                continue;
            }
            this.#registry_.set(key, value);
        }
    }

    unregister(keys) {
        keys = this.validate(keys);
        for (let key of keys) {
            if (!this.#registry_.has(key)) {
                Debug.warn(`${key}不存在，无需取消注册`);
                continue;
            }
            this.#registry_.delete(key);
        }
    }

    getItem(key) {
        return this.#registry_.get(key) ?? null;
    }

    length() {
        return this.#registry_.size;
    }

    keys() {
        return [...this.#registry_.keys()];
    }

    getAllItem() {
        return this.#registry_;
    }
}

Mixly.Registry = Registry;

});