var ini = document.getElementById("fecha_inicio")
var final = document.getElementById("fecha_final")
var Hoy = new Date();
var YY = Hoy.getFullYear();
var MM = Hoy.getMonth() + 1;
var DD = Hoy.getDate();
var Fecha_Hoy = YY + '-' + 0 + MM + '-' + DD;
ini.value = Fecha_Hoy;
final.value = Fecha_Hoy;

function audi_buscar() {
    var Div = document.getElementById("audi_cliente");
    Div.innerHTML = "";
    var inicio = document.getElementById("fecha_inicio");
    var final = document.getElementById("fecha_final");
    console.log(inicio.value);
    console.log(final.value);
    function Mostrar(data) {
        data.map(function(e) {
            console.log('esto me llego', e.created_at);
            var newDiv = document.createElement("div");
            
            newDiv.innerHTML = `<div class="container mx-auto  m-2" id="div-dos">
            <div class="row text-center">
                <div class="col-2">
                    <h6 id="nombre-lll">${e.nombre}</h6>
                </div>
                <div class="col-2">
                    <h6>${e.apellido}</h6>
                </div>
                <div class="col-2">
                    <h6>${e.created_at}</h6>
                </div>
                <div class="col-2">
                    <h6>${e.hora} : ${e.minutos} - ${e.meridiano}</h6>
                </div>
                <div class="col-2">
                    <h6>${e.usuario_pms}</h6> 
                </div>
                <div class="col-2">
                    <a href="/pms/ver-cliente/${e.id}">Ver</a>
                </div>
            </div>
            <div class="dropdown-divider" style="border-color: black;"></div>
        </div>`
            var Div = document.getElementById("audi_cliente");
            Div.append(newDiv);

        })
    }
    
    fetch(`http://localhost:4000/pms/fetch_audi/${inicio.value}/${final.value}`)
            .then(response => response.json()) 
            .then(data => { Mostrar(data) })
}