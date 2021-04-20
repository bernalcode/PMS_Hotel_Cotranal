function buscar_reservas(search) {

    var entrada = search.value;

    if (!document.getElementById("nota")) {

        var card = document.createElement("p");
        card.setAttribute("style", `color: black;`);
        card.setAttribute("id", `nota`);
        card.innerHTML = "Sin resultados !";
        var nota = document.getElementById("card-buscar");
        nota.append(card);
    }


    function render(data) {

        for (let i = 0; i < data.length; i++) {
            let dato = data[i];
            dato.bool = false;
        }

        data[data.length - 1].ultimo = true;

        data.map(function (x) {
            window['ar' + x.id] = [x.nombre, x.apellido, x.numero_habitacion, x.numero_documento];

            if (entrada == window['ar' + x.id][0]) {
                x.bool = true;
            }
            if (entrada == window['ar' + x.id][1]) {
                x.bool = true;
            }
            if (entrada == window['ar' + x.id][2]) {
                x.bool = true;
            }
            if (entrada == window['ar' + x.id][3]) {
                x.bool = true;
            }

        })

        var divs = [];

        for (let a = 0; a < data.length; a++) {

            if (data[a].bool == true) {

                if (document.getElementById("nota")) {
                    var card = document.getElementById("card-buscar");
                    var nota = document.getElementById("nota");
                    card.removeChild(nota);
                }

                var newDiv = document.createElement("div");
                newDiv.setAttribute("class", `container mx-auto  m-2`);
                newDiv.setAttribute("id", `${data[a].id}`);
                newDiv.innerHTML = `<div class="row text-center m-1">
                                        <div class="col-md-2  ">
                                            <h6>${data[a].numero_habitacion}</h6>
                                        </div>
                                        <div class="col-md-3 ">
                                            <h6>${data[a].nombre} ${data[a].apellido}</h6>
                                        </div>
                                        <div class="col-md-3 ">
                                            <h6>${data[a].numero_documento}</h6>
                                        </div>
                                        <div class="col-md-2 ">
                                            <a href="/pms/ver-reserva/${data[a].id_reserva}" style="color: rgb(243, 246, 41);">Ver</a>
                                        </div>
                                        <div class="col-md-2 ">
                                    
                                            <a href="/pms/park" style="color: rgb(223, 10, 10);">Ir</a>
                                    
                                        </div>
                                    
                                    
                                    </div>
                                    <div class="dropdown-divider" style="border-color: black;"></div>`;
                divs.push(newDiv);


            } // <-- fin del if ...

            var jan_reserva = document.getElementById("jan_reserva");
            jan_reserva.innerHTML = "";
            divs.map(function (e) { var jan_reserva = document.getElementById("jan_reserva"); jan_reserva.append(e); })

        }; // <--- ______ fin del for ________________

    }; // <--- ______ fin de la funcion render() que se llama en el fetch del evento "oninput()" ________________




    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    // evalua si el buscador esta vacio, si se escribe algo se llama a la base de datos
    // trayendo la base de datos de todos las reservas
    // luego se ejecuta la funcion "render()" pasandole como parametro la base de datos
    // de las reservas y ya luego la funcion busca el criterio de busqueda
    // en la base de datos que se trajo
    // ...TODO EN TIEMPO REAL ! ...
    if (entrada != "") {
        fetch('http://localhost:4000/pms/fetch_reserva')
            .then(response => response.json())
            .then(data => render(data));
    } else {  // Si el buscador esta vacion se renderiza de nuevo con 
        // Todas los reservas.


        var card = document.getElementById("card-buscar");
        var nota = document.getElementById("nota");
        card.removeChild(nota);




        fetch('http://localhost:4000/pms/fetch_reserva')
            .then(response => response.json())
            .then(data => {

                var dis = [];

                for (var a = 0; a < data.length; a++) {



                    // se crea el elemento "newDiv" en donde se almacena la reserva con el criterio de busqueda
                    var newDis = document.createElement("div")
                    newDis.setAttribute("class", `container mx-auto  m-2`);
                    newDis.setAttribute("id", `${data[a].id}`);
                    newDis.innerHTML = `<div class="row text-center m-1">
                                            <div class="col-md-2  ">
                                                <h6>${data[a].numero_habitacion}</h6>
                                            </div>
                                            <div class="col-md-3 ">
                                                <h6>${data[a].nombre} ${data[a].apellido}</h6>
                                            </div>
                                            <div class="col-md-3 ">
                                                <h6>${data[a].numero_documento}</h6>
                                            </div>
                                            <div class="col-md-2 ">
                                                <a href="/pms/ver-reserva/${data[a].id_reserva}" style="color: rgb(243, 246, 41);">Ver</a>
                                            </div>
                                            <div class="col-md-2 ">

                                                <a href="/pms/park" style="color: rgb(223, 10, 10);">Ir</a>

                                            </div>


                                        </div>
                                        <div class="dropdown-divider" style="border-color: black;"></div>`;
                    //_________________________________________________________________________________________

                    // ******** se agrega el nuevo elemento al array "dis"
                    dis.push(newDis);
                    //___________________________________________________________________________________







                    // se toma el div de la ventana donde se ven las reservas en el pms
                    var jan_reserva = document.getElementById("jan_reserva")
                    //___________________________________________________

                    //se limpia el div para poder colocar 'solo' las que cumplieron con el
                    //criterio de busqueda
                    jan_reserva.innerHTML = "";
                    //_______________________________________________________

                    //se itera en cada uno de los elementos del array y se renderiza en
                    //la ventana del navegador
                    dis.map(function (e) {
                        var jan_reserva = document.getElementById("jan_reserva");
                        jan_reserva.append(e);
                    })
                    
                    //_______________________________________________________
                } // <--- ______ fin del for ________________

            }) // <--- ______ fin del segundo .then del fetch para el buscar "vacio" ________________



    } // <-- fin del else

}// <--- ______ fin de la funcion llamada por el evento "oninput()"________________