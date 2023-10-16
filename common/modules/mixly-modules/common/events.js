goog.loadJs('common', () => {

goog.require('Mixly.IdGenerator');
goog.require('Mixly.MArray');
goog.provide('Mixly.Events');

const { IdGenerator, MArray } = Mixly;

class Events {
    constructor(eventsType = []) {
        this.events = {};
        this.eventsType = eventsType;
    }

    addType(eventsType) {
        this.eventsType = MArray.unique([ this.eventsType, ...eventsType ]);
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
        this.events[type] = this.events[type] ?? {};
        this.events[type][id] = func;
        return id;
    }

    unbind(id) {
        for (let [ _, value ] of Object.entries(this.events)) {
            if (!value[id]) {
                continue;
            }
            delete value[id];
        }
        return this;
    }

    off(type) {
        this.events[type] = {};
        return this;
    }

    run(...args) {
        const type = args[0];
        if (!this.exist(type)) {
            return this;
        }
        let outputs = [];
        const eventsFunc = this.events[type] ?? {};
        args.shift();
        for (let [ _, func ] of Object.entries(eventsFunc)) {
            outputs.push(func(...args));
        }
        return outputs;
    }
}

Mixly.Events = Events;

});