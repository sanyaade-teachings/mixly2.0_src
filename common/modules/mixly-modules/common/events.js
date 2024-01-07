goog.loadJs('common', () => {

goog.require('Mixly.IdGenerator');
goog.require('Mixly.MArray');
goog.require('Mixly.Registry');
goog.provide('Mixly.Events');

const {
    IdGenerator,
    MArray,
    Registry
} = Mixly;

class Events {
    constructor(eventsType = []) {
        this.events = new Registry();
        this.eventsType = eventsType;
    }

    addType(eventsType) {
        this.eventsType = MArray.unique([...this.eventsType, ...eventsType]);
    }

    exist(type) {
        if (!this.eventsType.includes(type)) {
            console.warn(`${type} event does not exist under the class`);
            return false;
        } else {
            return true;
        }
    }

    bind(type, func) {
        if (!this.exist(type)) {
            return this;
        }
        const id = IdGenerator.generate();
        let typeEvent = this.events.getItem(type);
        if (!typeEvent) {
            typeEvent = new Registry();
            this.events.register(type, typeEvent);
        }
        typeEvent.register(id, func);
        return id;
    }

    unbind(id) {
        for (let [_, value] of this.events.getAllItem()) {
            let typeEvent = value;
            if (!typeEvent.getItem(id)) {
                continue;
            }
            typeEvent.unregister(id);
        }
        return this;
    }

    off(type) {
        if (this.events.getItem(type)) {
            this.events.unregister(type);
        }
        return this;
    }

    run(...args) {
        const type = args[0];
        let outputs = [];
        if (!this.exist(type)) {
            return outputs;
        }
        const eventsFunc = this.events.getItem(type);
        if (!eventsFunc) {
            return outputs;
        }
        args.shift();
        for (let [_, func] of eventsFunc.getAllItem()) {
            outputs.push(func(...args));
        }
        return outputs;
    }

    reset() {
        this.events.reset();
    }

    length(type) {
        const typeEvent = this.events.getItem(type);
        if (typeEvent) {
            return typeEvent.length();
        }
        return 0;
    }
}

Mixly.Events = Events;

});