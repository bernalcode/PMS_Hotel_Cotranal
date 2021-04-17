    function form_agregar_habitacion () {
        // console.log('ESTo ES AGREGAR HABITACION ')
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: ' Campo Habitacion Vacio!',
        //     footer: '<p>Escoge una Habitacion ... </p>'
        //   })

        var habi_agr_h = document.getElementById("input_numero_Habitacion").value;
        if (habi_agr_h == "" || habi_agr_h == null ) {
             Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ' Campo Numero de ::: Habitacion Vacio!',
            footer: '<p>Escoge una Habitacion ... </p>'
          });
          return false;
        }
        
        
        console.warn("esto es :::::",habi_agr_h);

        return true;
    }