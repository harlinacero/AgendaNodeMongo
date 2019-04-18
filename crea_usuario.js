'use strict';

let MongoClient = require('mongodb').MongoClient;
    // bcrypt = require('bcrypt-nodejs');

const url = 'mongodb://localhost/agenda';//url de conexión

MongoClient.connect(url, (err, db) => {//función de conexión
    if (err) throw err;
    console.log('Base de Datos AGENDA iniciada correctamente...');

    const Usuarios = db.collection('usuarios');//creación de la colección usuarios

    Usuarios.findOne({nomusu: 'admin'}, (err, doc) => {//búsqueda del usuario con los parámetros del form
        if (err) throw err;
	//si el documento no existe, crea el usuario 
        if (doc) {
            console.log('Usuario registrado anteriormente');
        }
        else {
            // let salt = bcrypt.genSaltSync();
            // let password_hash = bcrypt.hashSync('clave', salt);//encriptación de la contraseña
            Usuarios.insertOne({nomusu: 'admin', clave: 'clave'}, (err, doc) => {//insercióon del usuario en la base de datos
                if (err) throw err;
                console.log('usuario registrado correctamente...', JSON.stringify(doc));
            });
        }
        db.close();
    });
});
