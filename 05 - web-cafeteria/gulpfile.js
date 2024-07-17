// Usamos este archivo para escribir las tareas (funciones javascript).

//Importamos las funciones / dependencias a usar del archivo node_modules usamos la variables const para importarlas.
// CSS Y SASS
const {src, dest, watch, series, parallel} = require('gulp'); // Importamos las funciones necesarias dentro de las llaves {}.
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');  // postcss -> sirve para hacer el código compatible con los navegadores que queramos.
const autoprefixer = require('autoprefixer'); // autoprefixer -> sirve para hacer el código compatible con los navegadores que queramos.

// IMAGENES.
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');


//función para compilar archivos scss
function css(done){
    // compilar sass con la funcion css.
    // pasos: 1 - identificar archivo, 2- Compilarla, 3 - Guardar el .css
    src('src/scss/app.scss')// Identificamos el archivo.
        .pipe( sass({ outputStyle: 'expanded'}) ) // Compilamos el archivo .scss y da formato de salida al archivo css
        .pipe( postcss([ autoprefixer() ]))
        .pipe( dest('build/css') ) // Guardamos el archivo en la carpeta indicada.
    done();
}

function versionWebp(done){
    src('src/img/**/*.{png, jpg}')
        .pipe( webp())
        .pipe( dest('build/img'))
    done();
}

// función para agregar imagenes a la carpeta build de nuestro proyecto y minificarlas.
function imagenes(done){
    src('src/img/**/*') // Damos la ruta donde vamos a buscar los archivos.
        .pipe( imagemin({optimizationLevel: 3}))
        .pipe( dest('build/img')) // Damos la ruta de destino para las imágenes
    done();
}


// función para revisar contantemente si hay cambios y actualizarlos.
function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

// Activamos las funciónes para poder usarlas con la terminal.
exports.css = css; 
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series ( imagenes, versionWebp, css, dev );

// series - Se inicia una tarea y hasta que finaliza no empieza la siguiente.
// parallel - Todas inician a la vez.