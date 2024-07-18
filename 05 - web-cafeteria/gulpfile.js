// Usamos este archivo para escribir las tareas (funciones javascript).

//Importamos las funciones / dependencias a usar del archivo node_modules usamos la variables const para importarlas.
// CSS Y SASS
const {src, dest, watch, series, parallel} = require('gulp'); // Importamos las funciones necesarias dentro de las llaves {}.
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');  // postcss -> sirve para hacer el código compatible con los navegadores que queramos.
const autoprefixer = require('autoprefixer'); // autoprefixer -> sirve para hacer el código compatible con los navegadores que queramos.

// IMAGENES.
const imagemin = require('gulp-imagemin');
//const webp = require('gulp-webp'); //se suprimen por problema de compatibilidad.
//const avif = require('gulp-avif'); //se suprimen por problema de compatibilidad.


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


// función para agregar imagenes a la carpeta build de nuestro proyecto y minificarlas.
function imagenes(done){
    src('src/img/**/*') // Damos la ruta donde vamos a buscar los archivos.
        .pipe( imagemin({optimizationLevel: 3}))
        .pipe( dest('build/img')) // Damos la ruta de destino para las imágenes
    done();
}

//función para convertir imagenes png y jpg a webp
function versionWebp(done){
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png, jpg}')
        .pipe( webp(opciones))
        .pipe( dest('build/img'))
    done();
}

//función para convertir imagenes png y jpg a avif
function versionAvif(done){
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png, jpg}')
        .pipe( avif(opciones))
        .pipe( dest('build/img'))
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
//exports.versionWebp = versionWebp; //se suprimen por problema de compatibilidad.
//exports.versionAvif = versionAvif; //se suprimen por problema de compatibilidad.
exports.default = series (imagenes, css, dev );

// series - Se inicia una tarea y hasta que finaliza no empieza la siguiente.
// parallel - Todas inician a la vez.