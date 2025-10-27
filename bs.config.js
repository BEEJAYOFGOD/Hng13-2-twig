module.exports = {
    proxy: "localhost/twig-ticket-app",
    files: ["public/css/**/*.css", "templates/**/*.twig", "public/**/*.php"],
    notify: false,
    open: false,
    reloadDelay: 500,
    reloadDebounce: 500,
    injectChanges: false, // Force full page reload
};
