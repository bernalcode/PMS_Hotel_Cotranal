var expe = document.getElementById("expe_reg_cliente");


var ddate = new Date();
var YY_ddate = ddate.getFullYear();
var M_ddate = ddate.getMonth() + 1;
var MM_ddate = 0 + M_ddate;
var D_ddate = 0 + ddate.getDate();
var DD_ddate = D_ddate - 1;
var fecha_expe = YY_ddate + '-' + 0 + MM_ddate + '-' + DD_ddate;


expe.max = fecha_expe;




function validar_rg_cliente() {

    //Nombre ----------------------------------------------------
    var nname = document.getElementById("nombre_rg_cliente").value;
    if (nname == "") {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Nombre Vacio!'

        })
        return false;
    }
    //-----------------------------------------------------------

    //Apellido ----------------------------------------------------
    var aapellido = document.getElementById("apellido_rg_cliente").value;
    if (aapellido == "") {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Apellido Vacio!'

        })
        return false;
    }
    //-----------------------------------------------------------

    //Nacionalidad ----------------------------------------------------
    var nnacionalidad = document.getElementById("nacionalidad_rg_cliente").value;
    
    if (nnacionalidad == "") {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Nacionalidad Vacio!'

        })
        return false;
    }
    //-----------------------------------------------------------

    //Tipo de Documento ----------------------------------------------------
    var tipo_doc_rg_cliente = document.getElementById("tipo_doc_rg_cliente").value;
    
    if (tipo_doc_rg_cliente == "0") {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Tipo de Documento Vacio!'

        })
        return false;
    }
    //-----------------------------------------------------------

    //Numero de Cedula ----------------------------------------------------
    var ccedula = document.getElementById("cedula_rg_cliente").value;
    
    if (ccedula == "") {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Numero de Cedula Vacio!'

        })
        return false;
    }
    //-----------------------------------------------------------

    //Fecha de Expedicion ----------------------------------------------------
    var expe_reg_cliente = document.getElementById("expe_reg_cliente").value;
    console.warn(expe_reg_cliente)
    if (expe_reg_cliente == "") {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Fecha de Expedicion de Vacio!',
            footer: 'Escoge una Fecha'

        })
        return false;
    }
    //-----------------------------------------------------------

    //Lugar de Expedicion ----------------------------------------------------
    var lg_expe = document.getElementById("lugar_exp_rg_cliente").value;
    
    if (lg_expe == "") {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Lugar de Expedicion Vacio!'

        })
        return false;
    }
    //-----------------------------------------------------------

    //Numero de Contacto ----------------------------------------------------
    var ccelular = document.getElementById("celular_rg_cliente").value;
    
    if (ccelular == "") {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Celular Vacio!'

        })
        return false;
    }
    //-----------------------------------------------------------
    
    //Correo ----------------------------------------------------
    var ccorreo = document.getElementById("correo_rg_cliente").value;
    
    if (ccorreo == "") {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campo Correo Vacio!'

        })
        return false;
    }
    //-----------------------------------------------------------
    


    return true;

}



