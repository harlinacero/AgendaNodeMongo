'use strict';

var ObjectId = require('mongodb').ObjectID;

const usuario = require('../models/usuario');


module.exports = (app, db) => {
	//instancia del objeto usuario, donde se encuentran los métodos
    const Usuario = new usuario(db);
    

    app.get('/', (req, res) => {
        res.sendFile('index.html');
    });

	//verificar existencia y valores del usuario
    app.post('/login', (req, res) => {
        Usuario.verificaUsuario(req.body, (error, respuesta) => {
            if (error)
                throw error;
            else if (respuesta) {
                app.locals.id = respuesta._id;
                res.send('Validado');
            }
            else
                res.send('Error');
        });
    });

    
};