function form_agregar_habitacion() {

  var habi_agr_h = document.getElementById("input_numero_Habitacion").value;
  if (habi_agr_h == "" || habi_agr_h == null) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: ' Campo Numero de Habitacion Vacio!',
      footer: '<p>Escoge una Habitacion ... </p>'
    });
    return false;
  }
  //------------------------------------------------
  var id_tipo_habitacion = document.getElementById("id_tipo_habitacion").value;
  if (id_tipo_habitacion == 'tipo') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: ' Campo Tipo de Habitacion Vacio!',
      footer: '<p>Escoge un Tipo ... </p>'
    });
    return false;
  }



  return true;
}