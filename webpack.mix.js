const mix = require('laravel-mix');


mix.react('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .js('node_modules/popper.js/dist/popper.js', 'public/js').sourceMaps();

  
   
