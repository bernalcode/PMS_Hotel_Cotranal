
const sql = require('../database');


module.exports = {

    // VER TODOS LOS CLIENTES REGISTRADOS EN LA BASE DE DATOS
    async getClientes(req, res) {
        const clientes = await sql.query('SELECT * FROM cliente');
        res.render('cliente/todos-clientes.hbs', { clientes });
    },

    //  FORMULARIO PARA REGISTRAR UN NUEVO CLIENTE
    getSignupCliente(req, res) {
        res.render('cliente/registrar-cliente.hbs');
    },

    // REGISTRAR CLIENTE EN LA BASE DE DATOS
    async postSignupClient(req, res) {
        const { nombre,
            apellido,
            sexo,
            nacionalidad,
            tipo_documento,
            numero_documento,
            fecha_expedicion,
            lugar_expedicion,
            celular,
            correo
        } = req.body;
        const datosCliente = {
            nombre,
            apellido,
            sexo,
            nacionalidad,
            tipo_documento,
            numero_documento,
            fecha_expedicion,
            lugar_expedicion,
            celular,
            correo
        };
        await sql.query('INSERT INTO cliente SET ?', [datosCliente]);
        req.flash('success', 'Cliente Agregado Satisfactoriamente');
        res.redirect('/pms/clientes');
    },
    
    // VER TODOS LOS DATOS DEL CLIENTE
    async seeClient(req, res) {
        const { id } = req.params;
        const datos_cliente = await sql.query('SELECT * FROM cliente WHERE id = ?', [id]);
        const fecha = await sql.query('SELECT fecha_expedicion FROM cliente WHERE id = ?', [id]);
        var date = fecha[0].fecha_expedicion;
        var fech_y = date.getFullYear();
        var fech_m = date.getMonth() + 1;
        var fech_d = date.getDate();
        if (fech_m < 10) {
            fech_m = '0' + fech_m;
        };
        if (fech_d < 10) {
            fech_d = '0' + fech_d;
        };
        const fecha_final = fech_y + '-' + fech_m + '-' + fech_d;
        const cliente = datos_cliente[0];
        res.render('cliente/ver-cliente.hbs', { cliente, fecha_final });
    },

    // BORRAR EL CLIENTE DE LA BASE DE DATOS
    async deleteClient(req, res) {
        const { id } = req.params;
        await sql.query('DELETE FROM cliente WHERE id = ?', [id]);
        req.flash('success', 'Cliente Borrado con Exito');
        res.redirect('/pms/clientes');
    },

    // EDITAR DATOS DEL CLIENTE 
    async editarCliente (req, res) {
        const { id } = req.params;
            const { nombre,
                apellido,
                celular,
                sexo,
                correo,
                tipo_documento,
                fecha_expedicion,
                lugar_expedicion,
                numero_documento,
                nacionalidad
            } = req.body;
            const datos = {
                nombre,
                apellido,
                sexo,
                nacionalidad,
                tipo_documento,
                numero_documento,
                fecha_expedicion,
                lugar_expedicion,
                celular,
                correo
            };
            await sql.query('UPDATE cliente SET ? WHERE id = ?', [datos, id]);
            req.flash('success', 'Cliente Editado con Exito');
            res.redirect('/pms/clientes');
    }







}




