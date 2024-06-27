// Usamos este archivo para escribir las tareas (funciones javascript).

function tarea (done){
    console.log('Mi primera tarea...');

    done(); // la función "done" se usa para indicarle a gulp cuando empieza y cuando acaba la tarea.
}

// exports -> permite a gulp usar la tarea creada previamente.
exports.primerTarea = tarea;
