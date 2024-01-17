goog.loadJs('common', () => {

goog.require('Mixly.XML');
goog.require('Mixly.Registry');
goog.require('Mixly.IdGenerator');
goog.provide('Mixly.HTMLTemplate');

const {
	XML,
	Registry,
	IdGenerator,
} = Mixly;

class HTMLTemplate {
    static {
        this.templateRegistry = new Registry();

        this.add = function(id, htmlTemplate) {
            if (this.get(id)) {
                return;
            }
            this.templateRegistry.register(id, htmlTemplate);
        }

        this.remove = function(id) {
            this.templateRegistry.unregister(id);
        }

        this.get = function(id) {
            return this.templateRegistry.getItem(id);
        }
    }

    #style = null;
    #html = null;
    constructor(template) {
        this.id = IdGenerator.generate();
        const regexStyle = /(?<=<style>)[\s\S]*?(?=<\/style>)/gm;
        const regexHTML = /<style>[\s\S]*?<\/style>/gm;
        this.#style = XML.render((template.match(regexStyle) || []).join('\n'), {
            mId: this.id
        });
        this.#html = template.replace(regexHTML, '');
        if (this.#style) {
        	this.addCSS();
        }
    }

    render(config = {}) {
        if (!config.mId) {
            config.mId = this.id;
        }
        return XML.render(this.#html, config);
    }

    addCSS() {
        let hasStyleNode = $('head').find(`style[style-id="${this.id}"]`).length;
        if (hasStyleNode) {
            return;
        }
        let $style = $('<style></style>');
        $style.attr('style-id', this.id);
        $style.attr('type', 'text/css').html(this.#style);
        $('head').append($style);
    }
}

Mixly.HTMLTemplate = HTMLTemplate;

});