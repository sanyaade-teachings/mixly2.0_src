(() => {

goog.require('Mixly.Config');
goog.provide('Mixly.Loading');

const {
    Loading,
    Config
} = Mixly;

const { USER } = Config;

if (USER.theme === 'dark') {
    $('html').attr('data-bs-theme', 'dark');
} else {
    $('html').attr('data-bs-theme', 'light');
}

$('html').append(
    `<div class="loading" id="loading"></div>`
);

window.addEventListener('DOMContentLoaded', () => {
    if (USER.theme === "dark") {
        $("body").addClass('dark');
    } else {
        $("body").addClass('light');
    }
});


})();