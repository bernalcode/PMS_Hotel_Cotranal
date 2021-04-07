function buscar_habitaciones(search) {
    console.log()

    // =============

    var ocupada = document.getElementById("ocupada");
    var desocupada = document.getElementById("ocupada");
    

    // =============

    
    var entrada = search.value;
    console.warn('j');

    if (!document.getElementById("nota_habitaciones")) {

        var card = document.createElement("p");
        card.setAttribute("style", `color: black;`);
        card.setAttribute("id", `nota_habitaciones`);
        card.innerHTML = "Sin resultados !";
        var nota = document.getElementById("card_habitaciones");
        nota.append(card);
    }


    function render(data) {
        

        for (let i = 0; i < data.length; i++) {
            let dato = data[i];
            dato.bool = false;
        }

        data[data.length - 1].ultimo = true;

        data.map(function (x) {
            window['ar' + x.id] = [x.numero_habitacion, x.descripcion, x.precio_habitacion, x.estado];

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

                if (document.getElementById("nota_habitaciones")) {
                    var card = document.getElementById("card_habitaciones");
                    var nota = document.getElementById("nota_habitaciones");
                    card.removeChild(nota);
                }

                var newDiv = document.createElement("div");
                newDiv.setAttribute("class", `container mx-auto  m-2`);
                newDiv.setAttribute("id", `${data[a].id_habitacion}`);
                
                
                var plantilla = `<div class="row text-center m-2 justify-content-center align-items-center">
                <div class="col-md-2  p-2">
                    <h6>${data[a].numero_habitacion}</h6>
                </div>
                <div class="col-md-2 ">
                    <h6>${data[a].descripcion}</h6>
                </div>
                <div class="col-md-2 ">
                    <h6>${data[a].precio_habitacion}</h6>
                </div>
                {{#if ${document.getElementById(`h${data[a].numero_habitacion}`).innerHTML} }}
                <div class="col-md-2" >
                    <h6 style="color: red;" id="${data[a].numero_habitacion}">OCUPADA</h6>
                </div>
                {{else}}
                <div class="col-md-2 ">
                    <h6 style="color:rgb(248, 252, 6)" id="${data[a].numero_habitacion}">Desocupada</h6>
                </div>
                {{/if}}
        
        
                <div class="col-md-2 ">
                    <h6 id="stado" style="color: rgb(7, 170, 7);" class="ide">${data[a].estado}</h6>
                </div>
        
                {{!-- --}}
                {{#if persona }}
                <div class="col-md-2 ">
                    <a href="/pms/editar-habitacion-ocupada/${data[a].id_habitacion}" class="btn btn-secondary">Ver</a>
                </div>
                {{else}}
                <div class="col-md-2 ">
                    <a href="/pms/editar-habitacion-desocupada/${data[a].id_habitacion}" class="btn btn-secondary">Ver</a>
                </div>
                {{/if}}
        
            </div>`;
                var compilada = Handlebars.compile(plantilla);
                
                
                newDiv.innerHTML = compilada();
                console.warn(newDiv);
                

                divs.push(newDiv);


            } // <-- fin del if ...

            var jan_habitaciones = document.getElementById("jan_habitaciones");
            jan_habitaciones.innerHTML = "";
            divs.map(function (e) { var jan_habitaciones = document.getElementById("jan_habitaciones"); jan_habitaciones.append(e); })

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
        fetch('http://localhost:4000/pms/fetch_habitaciones')
            .then(response => response.json())
            .then(data => render(data));
    } else {  // Si el buscador esta vacion se renderiza de nuevo con 
        // Todas los reservas.


        var card = document.getElementById("card_habitaciones");
        var nota = document.getElementById("nota_habitaciones");
        card.removeChild(nota);




        fetch('http://localhost:4000/pms/fetch_habitaciones')
            .then(response => response.json())
            .then(data => {

                var dis = [];

                for (var a = 0; a < data.length; a++) {



                    // se crea el elemento "newDiv" en donde se almacena la reserva con el criterio de busqueda
                    var newDis = document.createElement("div")
                    newDis.setAttribute("class", `container mx-auto  m-2`);
                    newDis.setAttribute("id", `${data[a].id}`);
                    var plantilla = `<div class="row text-center m-2 justify-content-center align-items-center">
                <div class="col-md-2  p-2">
                    <h6>${data[a].numero_habitacion}</h6>
                </div>
                <div class="col-md-2 ">
                    <h6>${data[a].descripcion}</h6>
                </div>
                <div class="col-md-2 ">
                    <h6>${data[a].precio_habitacion}</h6>
                </div>
                {{#if ${document.getElementById(`h${data[a].numero_habitacion}`).innerHTML} }}
                <div class="col-md-2 ">
                    <h6 style="color: red;" id="${data[a].numero_habitacion}">OCUPADA</h6>
                </div>
                {{else}}
                <div class="col-md-2 ">
                    <h6 style="color:rgb(248, 252, 6)" id="${data[a].numero_habitacion}">Desocupada</h6>
                </div>
                {{/if}}
        
        
                <div class="col-md-2 ">
                    <h6 id="stado" style="color: rgb(7, 170, 7);" class="ide">${data[a].estado}</h6>
                </div>
        
                {{!-- --}}
                {{#if persona }}
                <div class="col-md-2 ">
                    <a href="/pms/editar-habitacion-ocupada/${data[a].id_habitacion}" class="btn btn-secondary">Ver</a>
                </div>
                {{else}}
                <div class="col-md-2 ">
                    <a href="/pms/editar-habitacion-desocupada/${data[a].id_habitacion}" class="btn btn-secondary">Ver</a>
                </div>
                {{/if}}
        
            </div>`;
                var compilada = Handlebars.compile(plantilla);
                
                
                newDis.innerHTML = compilada();
                // console.error(newDis);
                // debugger



                    //_________________________________________________________________________________________

                    // ******** se agrega el nuevo elemento al array "dis"
                    dis.push(newDis);
                    //___________________________________________________________________________________







                    // se toma el div de la ventana donde se ven las reservas en el pms
                    var jan_habitaciones = document.getElementById("jan_habitaciones")
                    //___________________________________________________

                    //se limpia el div para poder colocar 'solo' las que cumplieron con el
                    //criterio de busqueda
                    jan_habitaciones.innerHTML = "";
                    //_______________________________________________________

                    //se itera en cada uno de los elementos del array y se renderiza en
                    //la ventana del navegador
                    dis.map(function (e) {
                        var jan_habitaciones = document.getElementById("jan_habitaciones");
                        jan_habitaciones.append(e);
                    })
                    
                    //_______________________________________________________
                } // <--- ______ fin del for ________________

            }) // <--- ______ fin del segundo .then del fetch para el buscar "vacio" ________________



    } // <-- fin del else

}// <--- ______ fin de la funcion llamada por el evento "oninput()"________________