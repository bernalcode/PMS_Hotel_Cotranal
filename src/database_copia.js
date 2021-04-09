const mysql = require('mysql');
const { promisify } = require('util');
const { database_copia } = require('./keys');
const pool_copia = mysql.createPool(database_copia);




// BASE DE DATOS PARA LA AUDITORIA -------------------------------------------------

pool_copia.getConnection((err, connection) => { 
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('COPIA de la Base de Datos Conectada !');
    return;
    
});
// _________________________________________________________________________



//Promisify Pool Querys

pool_copia.query = promisify(pool_copia.query);



module.exports = pool_copia;