api = (search) => {
    // ****** VALORES QUE TYPEA EL USUARIO EN EL BUSCADOR
    var entrada = search.value;
    // ___________________________


    //para buscar por caracter y no por palabra -----------------------------
    // var Entrada = entrada.split(""); //#############################################
    // __________________________________________________________







    //*** FUNCION QUE ES LLAMADA EN CADA EVENTO "onchange()" DEL BUSCADOR DEL REAL-TIME
    function render(data) {

        // ********   ASIGNARLE UN BOOLEANO A LOS DATOS DEL CLIENTE PARA PODER BUSCAR EN EL REAL TIME

        for (let i = 0; i < data.length; i++) {
            let dato = data[i];
            dato.bool = false;
        }

        //---------------------------------------------------------------------


        // **********  AQUI SE BUSCA, COMPARANDO LOS DATOS DE ENTRADA CON CADA UNO DE LOS DATOS EL CLIENTE


        data.map(function (x) {
            window['ar' + x.id] = [x.nombre, x.apellido, x.celular, x.numero_documento, x.correo];
            if (entrada == window['ar' + x.id][0]) {
                x.bool = true
            }
            if (entrada == window['ar' + x.id][1]) {
                x.bool = true
            }
            if (entrada == window['ar' + x.id][2]) {
                x.bool = true
            }
            if (entrada == window['ar' + x.id][3]) {
                x.bool = true
            }
            if (entrada == window['ar' + x.id][4]) {
                x.bool = true
            }
        })

        // ----------------------------------------------------------------------------


        //__________________________________________________________________________________
        //
        // SI EL DATO ES ENCONTRADO LA VARIABLE BOOL CAMBIA A TRUE
        // Y SE PROCEDE A CREAR UN ELEMENTO PARA GUARDAR AL CLIENTE CON EL DATO QUE SE BUSCA
        //___________________________________________________________________________________


        //___________________________________________________________________________________
        // Array para guarda el elemento creado y
        //renderizarlo en la ventana de clientes
        var divs = [];
        //__________________________________________________________________________________


        //_________________________________________________________________________________
        //
        //en este for se itera a travez del array "divs" guardando uno o mas clientes
        //con los criterio de busqueda
        // ya que puede haber mas de un cliente que puede cumplir con el criterio de
        // busqueda
        for (let a = 0; a < data.length; a++) {

            // se evalua si los datos que se trajeron esgtan en: "bool = true"
            // ya que si estan en true significa que tiene el criterio de busqueda
            if (data[a].bool == true) {

                // se crea el elemento "newDiv" en donde se almacena el cliente con el criterio de busqueda
                var newDiv = document.createElement("div")
                newDiv.setAttribute("class", `container mx-auto  m-2`);
                newDiv.setAttribute("id", `${data[a].id}`);
                newDiv.innerHTML = ` <div class="row text-center">
                                        <div class="col-2">
                                            <h6 id="nombre-lll">${data[a].nombre}</h6>
                                        </div>
                                        <div class="col-2">
                                            <h6>${data[a].apellido}</h6>
                                        </div>
                                        <div class="col-2">
                                            <h6>${data[a].numero_documento}</h6>
                                        </div>
                                        <div class="col-2">
                                            <h6>${data[a].celular}</h6>
                                        </div>
                                        <div class="col-2">
                                            <h6>${data[a].correo}</h6>
                                        </div>
                                        <div class="col-2">
                                            <a href="/pms/ver-cliente/${data[a].id}">Ver</a>
                                        </div>
                                    </div>
                                    <div class="dropdown-divider" style="border-color: black;"></div>`;
                //_________________________________________________________________________________________

                // ******** se agrega el nuevo elemento al array "divs"
                divs.push(newDiv);
                //___________________________________________________________________________________

            } // <-- fin del if ...


            // se toma el div de la ventana donde se ven los clientes en el PMS
            var jan = document.getElementById("jan")
            //___________________________________________________

            //se limpia el div para poder colocar 'solo' los 1os que cumplieron con el
            //criterio de busqueda
            jan.innerHTML = "";
            //_______________________________________________________

            //se itera en cada uno de los elementos del array y se renderiza en
            //la ventana del navegador
            divs.map(function (e) {
                var jan = document.getElementById("jan");
                jan.append(e);
            })
            //_______________________________________________________
        } // <--- ______ fin del for ________________
    }; // <--- ______ fin de la funcion render() que se llama en el fetch del evento "onchange()" ________________




    // evalua si el buscador esta vacio, si se escribe algo se llama a la base de datos
    // trayendo la base de datos de todos los clientes
    // luego se ejecuta la funcion "render()" pasandole como parametro la base de datos
    // de lo clientes y ya luego la funcion busca el criterio de busqueda
    // en la base de datos que se trajo
    // ...TODO EN TIEMPO REAL ! ...
    if (entrada != "") {
        fetch('http://localhost:4000/pms/fetch')
            .then(response => response.json())
            .then(data => { render(data) })
    } else {  // Si el buscador esta vacion se renderiza de nuevo con 
        // Todos los clientes.


        fetch('http://localhost:4000/pms/fetch')
            .then(response => response.json())
            .then(data => {

                var dis = [];

                for (var a = 0; a < data.length; a++) {



                    // se crea el elemento "newDiv" en donde se almacena el cliente con el criterio de busqueda
                    var newDis = document.createElement("div")
                    newDis.setAttribute("class", `container mx-auto  m-2`);
                    newDis.setAttribute("id", `${data[a].id}`);
                    newDis.innerHTML = `<div class="row text-center">
                                            <div class="col-2">
                                                <h6 id="nombre-lll">${data[a].nombre}</h6>
                                            </div>
                                            <div class="col-2">
                                                <h6>${data[a].apellido}</h6>
                                            </div>
                                            <div class="col-2">
                                                <h6>${data[a].numero_documento}</h6>
                                            </div>
                                            <div class="col-2">
                                                <h6>${data[a].celular}</h6>
                                            </div>
                                            <div class="col-2">
                                                <h6>${data[a].correo}</h6>
                                            </div>
                                            <div class="col-2">
                                                <a href="/pms/ver-cliente/${data[a].id}">Ver</a>
                                            </div>
                                        </div>
                                        <div class="dropdown-divider" style="border-color: black;"></div>`;
                    //_________________________________________________________________________________________

                    // ******** se agrega el nuevo elemento al array "dis"
                    dis.push(newDis);
                    //___________________________________________________________________________________







                    // se toma el div de la ventana donde se ven los clientes en el pms
                    var jan = document.getElementById("jan")
                    //___________________________________________________

                    //se limpia el div para poder colocar 'solo' los 1os que cumplieron con el
                    //criterio de busqueda
                    jan.innerHTML = "";
                    //_______________________________________________________

                    //se itera en cada uno de los elementos del array y se renderiza en
                    //la ventana del navegador
                    dis.map(function (e) {
                        var jan = document.getElementById("jan");
                        jan.append(e);
                    })
                    //_______________________________________________________
                } // <--- ______ fin del for ________________

            })



    } // <-- fin del else
}; // <-- fin del funcion del "onchange()""