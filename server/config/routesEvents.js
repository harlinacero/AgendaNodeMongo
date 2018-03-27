'use strict';

var ObjectId = require('mongodb').ObjectID;

//creación de los objetos usuario y evento
const usuario = require('../models/usuario');
const evento = require('../models/evento');
//creación del módulo routes events, en el que se encuentran las rutas y funciones correspondientes a los eventos de la agenda
//todos los eventos son creados a partir del modelo correspondiente, en este caso: evento
module.exports = (app, db) => {


    const Usuario = new usuario(db);//instancia del objeto evento, en el que se encuentran todos los métodos
    const Evento = new evento(db);//instancia del objeto evento, en el que se encuentran todos los métodos

   
	//cargar todos los eventos del usuario al ingresar la app
    app.get('/events/all', (req, res) => {
        if(typeof(app.locals.id) === 'undefined') {
            res.send('0');
        }
        else {
            Evento.recibirEventos(ObjectId(app.locals.id), (error, respuesta) => {
                if (error)
                    throw error;
                else
                    res.json(respuesta);
            });
        }
    });
    
	//agregar un nuevo evento a través de los datos enviados en el form
    app.post('/events/new', (req, res) => {
        req.body.nomusu = ObjectId(app.locals.id);
        if (req.body.end == "") delete req.body.end;

        Evento.agregarEvento(req.body, (error, respuesta) => {
            if (error)
                throw error;
            else
                res.json(respuesta);
        });
    });

	//Actualizar evento a través de los datos enviados por el evento
    app.post('/events/update/:id', (req, res) => {
        Evento.actualizarEvento(ObjectId(req.body.id), req.body, (error, respuesta) => {
            console.log('update', respuesta);
			res.send("Evento actualizado")
        });
    });

	//Eliminar evento a través del id enviado por el evento
    app.post('/events/delete/:id', (req, res) => {
        Evento.eliminarEvento(ObjectId(req.body.id), (error, respuesta) => {
            console.log('delete', respuesta);
			res.send("El evento ha sido eliminado")
        });
    });
};