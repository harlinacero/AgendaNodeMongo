'use strict';
//declaración de librerías y otros componentes necesarios
const express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 8082;
const config = {
    rootPath : __dirname
};
//conexión con base de datos
MongoClient.connect('mongodb://localhost/agenda', (err, db) => {
    if (err) throw err;
    console.log('Base de Datos AGENDA iniciada correctamente...');

	//importación de los diferentes módulos y rutas del servidor, separando usuarios y eventos para mayor organización 
    require('./server/config/express')(app, config);
    require('./server/config/routesEvents')(app, db);
	require('./server/config/routesUser')(app, db);

    app.listen(PORT, () => { console.log(`Servidor funcionando en el puerto ${PORT}`); });
});
