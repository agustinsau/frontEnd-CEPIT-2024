const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const mensaje = document.getElementById('mensaje');

const mensajeRespuesta = document.getElementById('mensaje-respuesta');

let informacion = [];

function guardarInformacion(n,a,e,t,m) {
    let fechaActual = new Date();
    let fechaFormateada = `${fechaActual.toLocaleDateString()} - Hora: ${fechaActual.toLocaleTimeString()}`;

    // Contenido del txt
    let contenidoForm = ` Nombre: ${n}\n Apellido: ${a}\n Telefono: ${e}\n Email: ${t}\n Su Mensaje: ${m}\n\n Fecha de Envio: ${fechaFormateada}`;

    let blob = new Blob([contenidoForm], { type: "text/plain;charset=utf-8" });

    //Libreria FileSaver.js
    saveAs(blob, "contact.txt");
}

//RegEx para verificar campos
const telefonoPattern = /^[0-9]{10}$/; 
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function limpiarFormContacto(){
    nombre.value = '';
    apellido.value = '';
    telefono.value = '';
    email.value = '';
    mensaje.value = '';
}

document.getElementById('enviar').addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener valores de los campos
    let n = nombre.value.trim();
    let a = apellido.value.trim();
    let e = email.value.trim();
    let t = telefono.value.trim();
    let m = mensaje.value.trim();

    // Utiliza .test para probar las expresiones regulares
    if (n === '' || a === '' || 
            e === '' || !emailPattern.test(e) || 
            t === '' || !telefonoPattern.test(t) || m === ''){

        mensajeRespuesta.textContent = 'Por favor, verifique todos los campos antes de enviar.';
        mensajeRespuesta.classList.replace('hidden', 'error');

    } else {  
        guardarInformacion(n,a,e,t,m);
        limpiarFormContacto();
        
        mensajeRespuesta.classList.replace('hidden','exito');
        mensajeRespuesta.classList.replace('error','exito');
        //mensajeRespuesta.classList.add('exito');
        mensajeRespuesta.textContent = 'Formulario enviado con Exito!';
    }

});
