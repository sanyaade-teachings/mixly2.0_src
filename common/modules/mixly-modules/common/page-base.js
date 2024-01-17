goog.loadJs('common', () => {

goog.require('Mixly.Events');
goog.require('Mixly.Registry');
goog.provide('Mixly.PageBase');

const {
    Events,
    Registry
} = Mixly;

class PageBase {
    #dirty = false;
    #pages_ = new Registry();
    #$content_ = null;
    #$tab_ = null;
    #active_ = true;
    #inited_ = false;
    #mounted_ = false;
    #events_ = new Events(['addDirty', 'removeDirty', 'destroyed', 'created', 'active']);

    constructor() {}

    init() {
        this.#forward_('init');
        this.#inited_ = true;
        this.#events_.run('created');
    }

    mountOn($container) {
        $container.append(this.getContent());
        this.onMounted();
    }

    addPage($child, id, page) {
        this.#pages_.register(id, page);
        $child.append(page.getContent());
    }

    removePage(id) {
        const page = this.getPage(id);
        if (!page) {
            return;
        }
        this.#pages_.unregister(id);
        page.dispose();
    }

    getPage(id) {
        return this.#pages_.getItem(id);
    }

    mountPage($child, id, page) {
        if (!this.#mounted_) {
            return;
        }
        this.addPage($child, id, page);
        page.onMounted();
    }

    setContent(jqElem) {
        if (this.#$content_) {
            this.#$content_.replaceWith(jqElem);
            this.#$content_ = jqElem;
        } else {
            this.#$content_ = jqElem;
        }
    }

    getContent() {
        return this.#$content_;
    }

    resize() {
        this.#forward_('resize');
    }

    dispose() {
        this.#events_.run('destroyed');
        this.#forward_('dispose');
        this.#pages_.reset();
        this.#$content_.remove();
        this.#$tab_ && this.#$tab_.remove();
        this.#events_.reset();
    }

    #forward_(type) {
        this.#pages_.getAllItems().forEach((page) => {
            if (typeof page[type] !== 'function') {
                return;
            }
            page[type]();
        });
    }

    onMounted() {
        this.#forward_('onMounted');
        this.#mounted_ = true;
        this.#active_ = true;
        this.#events_.run('active');
    }

    onUnmounted() {
        this.#forward_('onUnmounted');
        this.#mounted_ = false;
        this.#active_ = false;
    }

    setTab($tab) {
        this.#$tab_ = $tab;
    }

    getTab() {
        return this.#$tab_;
    }

    addDirty() {
        const $tab = this.getTab();
        if (!$tab || this.isDirty()) {
            return;
        }
        $tab.addClass('dirty');
        this.#events_.run('addDirty');
        this.#dirty = true;
    }

    removeDirty() {
        const $tab = this.getTab();
        if (!$tab || !this.isDirty()) {
            return;
        }
        this.#events_.run('removeDirty');
        $tab.removeClass('dirty');
        this.#dirty = false;
    }

    isDirty() {
        return this.#dirty;
    }

    isInited() {
        return this.#inited_;
    }

    isActive() {
        return this.#active_;
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

    runEvent(eventsType) {
        this.#events_.run(eventsType);
    }

    offEvent(eventsType) {
        this.#events_.off(eventsType);
    }
}

Mixly.PageBase = PageBase;

});