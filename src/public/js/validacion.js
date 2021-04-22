//MOSTRAR CONTRASEÑA AL CAMBIARLA ------------------------
mostrar_pass = (evt) => {
    evt.preventDefault();
    var change1 = document.getElementById("change1");
    var change2 = document.getElementById("change2");
    change1.setAttribute("type", "text");
    change2.setAttribute("type", "text");

};
//----------------------------------------------------------



//OCULTAR CONTRASEÑA AL CAMBIARLA --------------------------
ocultar_pass = (evt) => {
    evt.preventDefault();
    var change1 = document.getElementById("change1");
    var change2 = document.getElementById("change2");
    change1.setAttribute("type", "password");
    change2.setAttribute("type", "password");

};
//----------------------------------------------------------


//CONFIRMAR CAMBIO DE CONTRASEÑA
confirmar_pass = (d) => {
    console.warn(d);
    return false;
};

submit_pass = () => {

    var pass1 = document.getElementById("change1")
    var pass2 = document.getElementById("change2")

    var p1 = pass1.value;
    var p2 = pass2.value;

    if (p1 === p2) {
        return true;
    } else {
        Swal.fire(
            'Las Contraseñas no coinciden ',
            'Intentalo de Nuevo ! ...',
            'error'
        );
        return false;
    }

};



// VALIDACION DE INGRESO AL PMS ----------------------------
form_signin = () => {
    var user = document.getElementById("usuario").value;
    var pass = document.getElementById("contraseña").value;
    if (user == "" || user == null) {
        Swal.fire(
            'Campos vacios!',
            'Completa los campos ...',
            'error'
        );
        return false;
    } else if (pass == "" || pass == null) {
        Swal.fire(
            'Campos vacios!',
            'Completa los campos ...',
            'error'
        );
    } else {
        return true;
    }
    return false;
};
//-------------------------------------------------------------------------




// BORRAR USUARIO DEL PMS -----------------------------------------

// function borraruu() {
//     const resultt =  Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       })
    
// }

// async function BorrarUserPms() {

// const result = await Swal.fire({
//     title: 'Estas Seguro?',
//     text: 'hola',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Si, Estoy Seguro!'
// })

// if (result.value == true) {

// Swal.fire(
//     'Good job!',
//     'You clicked the button!',
//     'success'
// )
// }


// console.warn('llego');

// return false;

//};
//----------------------------------------------------------------





// RESETEAR PASSWORD DE USUARIO : "usuario123" -------------------
setPassword = async () => {


    return false;



};


// REGRESAR A LA PAGINA ANTERIOR
atras = () => {
    window.history.back();
    return true;
};
//------------------------------------------------------------------



// BORRAR CLIENTE -----------------------------------------
async function borrar_cliente() {
    const result = await Swal.fire({
        title: 'Estas Seguro?',
        text: "Se eliminaran todos los registros !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
    })
    console.log(result);

    if (result.value == true) {
        document.getElementById("borrar_cliente").click();
    }
};
// ------------------------------------------------------- 


// BORRAR RESERVA -----------------------------------------
async function borrar_reserva() {
    const result = await Swal.fire({
        title: 'Estas Seguro?',
        text: "Se Elliminaran todos los registros !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
    })
    console.log(result);

    if (result.value == true) {
        document.getElementById("borrar_reserva").click();
    }

};
// ------------------------------------------------------- 


async function segur() {
    const result = await Swal.fire({
        title: 'Estas Seguro?',
        text: "Se eliminaran todos los registros !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
    })
    console.log(result);

    if (result.value == true) {
        document.getElementById("eliminar").click();
    }
};



































// validarFormulario = () => {

//     //removemos el div con la clase alert
//     $('.alert').remove();

//     //declaracion de variables
//     let nombre = $('#nombre').val(),
//         movil = $('#movil').val(),
//         correo = $('#correo').val(),
//         asunto = $('#asunto').val(),
//         mensaje = $('#mensaje').val();

//     //validacion global de los campos
//     if (correo == "" || correo == null && asunto == "" || asunto == null && movil == "" || movil == null && nombre == "" || nombre == null) {
//         cambiarColor('nombre');
//         cambiarColor('movil');
//         cambiarColor('correo');
//         cambiarColor('asunto');
//         mostrarAlerta('Campos obligatorios!');
//         return false;
//     }
//     //validamos el campo nombre
//     if (nombre == "" || nombre == null) {
//         //cambiar color del borde 
//         cambiarColor("nombre");
//         // m ostramos el mensaje de alerta
//         mostrarAlerta('Campo "Nombre" obligatorio');
//         return false;
//     } else {
//         let expresion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
//         if (!expresion.test(nombre)) {
//             //mostrara el mensaje que debe ingresar un nombre valido
//             cambiarColor('nombre');
//             mostrarAlerta('No se permiten caracteres especiales o numeros');
//             return false;
//         }
//     }
//     //validamos el campo Celular
//     if (movil == "" || movil == null) {
//         //cambiar color del borde 
//         cambiarColor("movil");
//         // mostramos el mensaje de alerta
//         mostrarAlerta('Campo "Celular" obligatorio');
//         return false;
//     } else {
//         let expresion = /^([0-9])*$/;
//         if (!expresion.test(movil)) {
//             //mostrara el mensaje que debe ingresar un Celular valido
//             cambiarColor('movil');
//             mostrarAlerta('Por favor ingresa un numero valido');
//             return false;
//         }
//     }
//     //validamos el campo correo
//     if (correo == "" || correo == null) {
//         //cambiar color del borde 
//         cambiarColor("correo");
//         // mostramos el mensaje de alerta
//         mostrarAlerta('Campo "Correo" obligatorio');
//         return false;
//     } else {
//         let expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 4})+$/;
//         if (!expresion.test(correo)) {
//             //mostrara el mensaje que debe ingresar un nombre valido
//             cambiarColor('correo');
//             mostrarAlerta('Por favor ingresa un correo valido');
//             return false;
//         }
//     }

//     //validamos el campo Asunto
//     if (asunto == "" || asunto == null) {
//         //cambiar color del borde 
//         cambiarColor("asunto");
//         // mostramos el mensaje de alerta
//         mostrarAlerta('Campo "Asunto" obligatorio');
//         return false;
//     } else {
//         let expresion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
//         if (!expresion.test(asunto)) {
//             //mostrara el mensaje que debe ingresar un nombre valido
//             cambiarColor('asunto');
//             mostrarAlerta('Por favor ingresa un Asunto Valido');
//             return false;

//         }
//     }

//     return true;
// };

// cambiarColor = (dato) => {
//     $('#' + dato).css({
//         border: "1px solid #dd5144"
//     });
// };



// mostrarAlerta = (texto) => {
//     $('#nombre').before('<div class="alert">Error: ' + texto + '</div>');
// }
