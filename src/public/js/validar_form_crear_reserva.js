var i = document.getElementById("fechaMin");

var f = new Date();
var f_YY = f.getFullYear();
var f_MM = f.getMonth() + 1;
var f_DD = 0 + f.getDate();

var fech_crear_reserva = YY + '-' + MM + '-' + DD;


function form_crear_reserva() {

    var cr_nombre = document.getElementById("crear_reserva_id_cliente").value;
    var cr_habitacion = document.getElementById("crear_reserva_id_habitacion").value;
    var cr_fechaMin = document.getElementById("fechaMin").value;
    var cr_fechaMax = document.getElementById("fechaMax").value;
    var cr_adultos = document.getElementById("crear_reserva_adultos").value;
    var cr_ninos = document.getElementById("crear_reserva_ninos").value;


    if (cr_nombre == "Escoger Cliente") {
        console.error('Campo nombre Vacio !');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo "Cliente" Vacio',
            footer: '<p>Escoge un Cliente !</p>'
        })
        return false;
    }
    if (cr_habitacion == "Escoger Habitacion") {
        console.error('Campo habitacion Vacio !');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo "Habitacion" Vacio',
            footer: '<p>Escoge una Habitacion !</p>'
        })
        return false;
    }
    if (cr_fechaMin == "" || cr_fechaMin == null) {
        console.error('Campo check_in Vacio !');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo "Chek-In" Vacio',
            footer: '<p>Escoge una Fecha de Ingreso !</p>'
        })
        return false;
    }
    if (cr_adultos == "" || cr_adultos == null) {
        console.error('Campo adultos Vacio !');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo "Adultos" Vacio',
            footer: '<p>Cuantos Adultos Habran ?</p>'
        })
        return false;
    }

    return true;

}





