let mix = require('laravel-mix');

// (res, desc);
mix.js('resources/js/app.js', 'public/js/app.js').sass('resources/scss/app.scss', 'public/css/app.css');


// mix.js('src/app.js', 'dist').setPublicPath('dist');
