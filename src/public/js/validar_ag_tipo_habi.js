function ag_tipo_habi() {
    var text_descri_tipo = document.getElementById("text_descri_tipo").value;
    if (text_descri_tipo == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Escribe una Descripcion!'
            
        })
        return false;
    }
    precio_tipo_habi
    var precio_tipo_habi = document.getElementById("precio_tipo_habi").value;
    if (precio_tipo_habi == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Coloca un Precio a la Habitacion !'
            
        })
        return false;
    }

    return true;
}