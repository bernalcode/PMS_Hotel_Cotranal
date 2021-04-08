/*  ----------------------  SCRIPT PARA VALIDAR FECHA DE CHECKIN --------------    */
var fech = new Date()
var fech_y_in = fech.getFullYear();
var fech_m_in = fech.getMonth() + 1;
var fech_d_in = fech.getDate();
if (fech_m_in < 10) {
    fech_m_in = '0' + fech_m_in;
};
if (fech_d_in < 10) {
    fech_d_in = '0' + fech_d_in;
};
var fecha_in = fech_y_in + '-' + fech_m_in + '-' + fech_d_in;

var fechain_pagina = document.getElementById("fechain_pagina");
fechain_pagina.setAttribute("min", `${fecha_in}`);




// CAPTURAR EL EVENTO "CHANGE" Y TRABAJAR CON LAS FECHAS
fechain_pagina.addEventListener("change", (event) => {


    // TOMAR LA FECHA DEL CHECK_IN
    var fecha_checkout = fechain_pagina.value;
    //  CONVERTIR EL STRING: "AAAA-MM-DD" EN UN ARRAY: ["AAAA", "MM", "DD"]
    var array_fecha = fecha_checkout.split("-");


    switch (array_fecha[1]) {

        case "01":
            switch (array_fecha[2]) {
                case "31":
                    array_fecha[1] = "02";
                    array_fecha[2] = "0";
                    break;
            }
            break;

        case "02":
            switch (array_fecha[2]) {
                case "28":
                    array_fecha[1] = "03";
                    array_fecha[2] = "0";
                    break;

                case "29":
                    array_fecha[1] = "03";
                    array_fecha[2] = "0";
                    break;
            }
            break;

        case "03":
            switch (array_fecha[2]) {
                case "31":
                    array_fecha[1] = "04";
                    array_fecha[2] = "0";
                    break;
            }
            break;

        case "04":
            switch (array_fecha[2]) {
                case "30":

                    array_fecha[1] = "05";
                    array_fecha[2] = "0";

                    break;
            }
            break;

        case "05":
            switch (array_fecha[2]) {
                case "31":
                    array_fecha[1] = "06";
                    array_fecha[2] = "0";
                    break;
            }
            break;

        case "06":
            switch (array_fecha[2]) {
                case "30":
                    array_fecha[1] = "07";
                    array_fecha[2] = "0";
                    break;
            }
            break;

        case "07":
            switch (array_fecha[2]) {
                case "31":
                    array_fecha[1] = "08";
                    array_fecha[2] = "0";
                    break;
            }
            break;

        case "08":
            switch (array_fecha[2]) {
                case "31":
                    array_fecha[1] = "09";
                    array_fecha[2] = "0";
                    break;
            }
            break;

        case "09":
            switch (array_fecha[2]) {
                case "30":
                    array_fecha[1] = "10";
                    array_fecha[2] = "0";
                    break;
            }
            break;

        case "10":
            switch (array_fecha[2]) {
                case "31":
                    array_fecha[1] = "11";
                    array_fecha[2] = "0";
                    break;
            }
            break;

        case "11":
            switch (array_fecha[2]) {
                case "30":
                    array_fecha[1] = "12";
                    array_fecha[2] = "0";
                    break;
            }
            break;

        case "12":
            switch (array_fecha[2]) {
                case "31":
                    array_fecha[1] = "01";
                    array_fecha[2] = "0";
                    var year = array_fecha[0];
                    var newyear = parseInt(year) + 1;
                    var NewYear = newyear.toString();
                    array_fecha[0] = NewYear;
                    break;
            }
            break;
    };

    // SACAR EL DIA EL MES Y EL AÑO  Y PASARLOS A TIPO ENTERO
    var year = parseInt(array_fecha[0])
    var month = parseInt(array_fecha[1])
    var day = parseInt(array_fecha[2])
    // SUMARLE 1 PARA EL SIGUIENTE DIA EN EL CHECK_OUT
    var Day = day + 1;

    // SE PASA A TIPO "STRING"
    // SI EL DIA ES MENOR A 10 SE LE COLOCA EL CERO A LA IZQUIERDA : DE << num >> --> << 0num >>
    if (Day < 10) {
        var day_checkout = 0 + Day.toString();
    } else { // SI EL DIA ES IGUAL O MAYOR A 10 SOLO SE PASA A TIPO "STRING"
        var day_checkout = Day.toString();
    }
    // SE ASIGNA EL DIA DEL CHECK_OUT A EL ARRAY 
    array_fecha[2] = day_checkout;


    // SE UN EN UN SOLO STRING EL DIA EL MES Y EL AÑO PARA PASARLO AL CHECK_OUT
    var fecha_final_out = array_fecha[0] + "-" + array_fecha[1] + "-" + array_fecha[2];
    // SE COLOCA LA FECHA YA MODIFICADA EN EL CAMPO DEL CHACK_OUT

    //document.getElementById("fechaout_pagina").min = fecha_final_out;
    var fechaout_pagina = document.getElementById("fechaout_pagina");
    fechaout_pagina.setAttribute("min", `${fecha_final_out}`);
});



/* ------------------------------------------------------------------------------------------ */





/*  ----------------------  SCRIPT PARA VALIDAR FECHA DE CHECKOUT--------------    */


var fech = new Date()
var fech_y_in = fech.getFullYear();
var fech_m_in = fech.getMonth() + 1;
var fech_d_in = fech.getDate() + 1;

if (fech_m_in < 10) {
    fech_m_in = '0' + fech_m_in;
};
if (fech_d_in < 10) {
    fech_d_in = '0' + fech_d_in;
};
var fecha_in = fech_y_in + '-' + fech_m_in + '-' + fech_d_in;

//document.getElementById("fechaMax").min = fecha_in;
var fechaout_pagina = document.getElementById("fechaout_pagina");
fechaout_pagina.setAttribute("min", `${fecha_in}`);




/* ------------------------------------------------------------------------------------------ */


