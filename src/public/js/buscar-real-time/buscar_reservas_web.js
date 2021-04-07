function buscar_reservas_web(search) {

    var entrada = search.value;

    if (!document.getElementById("nota_web")) {

        var card = document.createElement("p");
        card.setAttribute("style", `color: black;`);
        card.setAttribute("id", `nota_web`);
        card.innerHTML = "Sin resultados !";
        var nota = document.getElementById("card-reserva-web");
        nota.append(card);
    }


    function render(data) {
        

        for (let i = 0; i < data.length; i++) {
            let dato = data[i];
            dato.bool = false;
        }

        data[data.length - 1].ultimo = true;

        data.map(function (x) {
            window['ar' + x.id] = [x.nombre, x.celular, x.correo];

            if (entrada == window['ar' + x.id][0]) {
                x.bool = true;
            }
            if (entrada == window['ar' + x.id][1]) {
                x.bool = true;
            }
            if (entrada == window['ar' + x.id][2]) {
                x.bool = true;
            }
        })

        var divs = [];

        for (let a = 0; a < data.length; a++) {

            if (data[a].bool == true) {

                if (document.getElementById("nota_web")) {
                    var card = document.getElementById("card-reserva-web");
                    var nota = document.getElementById("nota_web");
                    card.removeChild(nota);
                }

                var newDiv = document.createElement("div");
                newDiv.setAttribute("class", `container mx-auto  m-2`);
                newDiv.setAttribute("id", `${data[a].id}`);
                newDiv.innerHTML = `<div class="row text-center m-2 justify-content-center align-items-center">
                                    <div class="col-md-3 ">
                                        <h6>${data[a].nombre}</h6>
                                    </div>
                                    <div class="col-md-1 ">
                                        <h6>${data[a].celular}</h6>
                                    </div>
                                    <div class="col-md-3 ">
                                        <h6>${data[a].correo}</h6>
                                    </div>
                                    <div class="col-md-2 ">
                                        <h6>${data[a].check_in}</h6>
                                    </div>
                                    <div class="col-md-2 ">
                                        <a href="/pms/ver_reserva_web/${data[a].id}" class="btn btn-danger">Ver</a>
                                    </div>
                                </div>`;

                divs.push(newDiv);


            } // <-- fin del if ...

            var jan_reserva = document.getElementById("jan_reserva_web");
            jan_reserva.innerHTML = "";
            divs.map(function (e) { var jan_reserva = document.getElementById("jan_reserva_web"); jan_reserva_web.append(e); })

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
        fetch('http://localhost:4000/pms/fetch_reserva_web')
            .then(response => response.json())
            .then(data => render(data));
    } else {  // Si el buscador esta vacion se renderiza de nuevo con 
        // Todas los reservas.


        var card = document.getElementById("card-reserva-web");
        var nota = document.getElementById("nota_web");
        card.removeChild(nota);




        fetch('http://localhost:4000/pms/fetch_reserva_web')
            .then(response => response.json())
            .then(data => {

                var dis = [];

                for (var a = 0; a < data.length; a++) {



                    // se crea el elemento "newDiv" en donde se almacena la reserva con el criterio de busqueda
                    var newDis = document.createElement("div")
                    newDis.setAttribute("class", `container mx-auto  m-2`);
                    newDis.setAttribute("id", `${data[a].id}`);
                    newDis.innerHTML = `<div class="row text-center m-2 justify-content-center align-items-center">
                                            <div class="col-md-3 ">
                                                <h6>${data[a].nombre}</h6>
                                            </div>
                                            <div class="col-md-1 ">
                                                <h6>${data[a].celular}</h6>
                                            </div>
                                            <div class="col-md-3 ">
                                                <h6>${data[a].correo}</h6>
                                            </div>
                                            <div class="col-md-2 ">
                                                <h6>${data[a].check_in}</h6>
                                            </div>
                                            <div class="col-md-2 ">
                                                <a href="/pms/ver_reserva_web/${data[a].id}" class="btn btn-danger">Ver</a>
                                            </div>
                                        </div>`;
                    //_________________________________________________________________________________________

                    // ******** se agrega el nuevo elemento al array "dis"
                    dis.push(newDis);
                    //___________________________________________________________________________________







                    // se toma el div de la ventana donde se ven las reservas en el pms
                    var jan_reserva_web = document.getElementById("jan_reserva_web")
                    //___________________________________________________

                    //se limpia el div para poder colocar 'solo' las que cumplieron con el
                    //criterio de busqueda
                    jan_reserva_web.innerHTML = "";
                    //_______________________________________________________

                    //se itera en cada uno de los elementos del array y se renderiza en
                    //la ventana del navegador
                    dis.map(function (e) {
                        var jan_reserva_web = document.getElementById("jan_reserva_web");
                        jan_reserva_web.append(e);
                    })
                    
                    //_______________________________________________________
                } // <--- ______ fin del for ________________

            }) // <--- ______ fin del segundo .then del fetch para el buscar "vacio" ________________



    } // <-- fin del else

}// <--- ______ fin de la funcion llamada por el evento "oninput()"________________