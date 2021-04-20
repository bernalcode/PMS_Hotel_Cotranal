function reg_user_pms() {
    var nombrecompleto_reg_user = document.getElementById("nombrecompleto_reg_user").value
    var tipo_reg_user = document.getElementById("tipo_reg_user").value;
    var nombreuser_reg_user = document.getElementById("nombreuser_reg_user").value;
    var pass_reg_user = document.getElementById("pass_reg_user").value;

    // NOMBRE COMPLETO --------------
    if (nombrecompleto_reg_user == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Nombre Completo Vacio!'

        })
        return false;
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // TIPO DE USUARIO --------------
    if (tipo_reg_user == "tipo") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Escoge un Tipo de Usuario!'

        })
        return false;
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // NOMBRE DE USUARIO --------------
    if (nombreuser_reg_user == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Nombre de Usuario Vacio'

        })
        return false;
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    if (pass_reg_user == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Se require una Contraseña !! '

        })
        return false;
    }

    return true;
}