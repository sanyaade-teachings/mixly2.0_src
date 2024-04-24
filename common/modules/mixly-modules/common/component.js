goog.loadJs('common', () => {

goog.require('Mixly.Events');
goog.provide('Mixly.Component');

const { Events } = Mixly;


class Component {
    #$content_ = null;
    #mounted_ = false;
    #events_ = new Events(['destroyed', 'created']);

    constructor() {}

    mountOn($container) {
        $container.append(this.getContent());
        this.onMounted();
    }

    onMounted() {
        this.#mounted_ = true;
    }

    onUnmounted() {
        this.#mounted_ = false;
    }

    isMounted() {
        return this.#mounted_;
    }

    setContent(jqElem) {
        if (this.#$content_) {
            this.#$content_.replaceWith(jqElem);
        }
        this.#$content_ = jqElem;
    }

    getContent() {
        return this.#$content_;
    }

    resize() {}

    dispose() {
        this.runEvent('destroyed');
        this.#$content_.remove();
        this.resetEvent();
    }

    bind(type, func) {
        return this.#events_.bind(type, func);
    }

    unbind(id) {
        this.#events_.unbind(id);
    }

    addEventsType(eventsType) {
        this.#events_.addType(eventsType);
    }

    runEvent(eventsType, ...args) {
        return this.#events_.run(eventsType, ...args);
    }

    offEvent(eventsType) {
        this.#events_.off(eventsType);
    }

    resetEvent() {
        this.#events_.reset();
    }
}

Mixly.Component = Component;

});