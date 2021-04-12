var ini = document.getElementById("reserva_fecha_inicio")
var final = document.getElementById("reserva_fecha_final")
var Hoy = new Date();
var YY = Hoy.getFullYear();
var MM = Hoy.getMonth() + 1;
var DD = Hoy.getDate();
var Fecha_Hoy = YY + '-' + 0 + MM + '-' + DD;
ini.value = Fecha_Hoy;
final.value = Fecha_Hoy;

function admin_buscar_reservas() {
    var Div = document.getElementById("admin_reserva");
    Div.innerHTML = "";
    var inicio = document.getElementById("reserva_fecha_inicio");
    var final = document.getElementById("reserva_fecha_final");
    console.log(inicio.value);
    console.log(final.value);
    
    function Mostrar(data) {
        debugger
        data.map(function (e) {
            console.log('esto me llego', e);
            
            var newDiv = document.createElement("div");

            newDiv.innerHTML = `    <div class="row text-center m-1">
            <div class="col-md-2  ">
                <h6 style="color: white;">{{numero_habitacion}}</h6>
            </div>
            <div class="col-md-3 ">
                <h6 style="color: white;">{{nombre}} {{apellido}}</h6>
            </div>
            <div class="col-md-3 ">
                <h6 style="color: white;">{{numero_documento}}</h6>
            </div>
            <div class="col-md-2 ">
                <a href="/pms/ver-reserva/{{id_reserva}}" style="color: rgb(9, 207, 98);">Ver</a>
            </div>
            <div class="col-md-2 ">
                <a href="/pms/park/{{id_reserva}}" style="color: rgb(223, 10, 10);">Ir</a>
            </div>
        </div>
        <div class="dropdown-divider" style="border-color: black;"></div>`;

            var Div = document.getElementById("admin_reserva");
            Div.append(newDiv);

        })
    }

    fetch(`http://localhost:4000/pms/fetch_admin_reservas/${inicio.value}/${final.value}`)
        .then(response => response.json())
        .then(data => { Mostrar(data) })
}
