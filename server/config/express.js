'use strict';

const logger = require('morgan'),
    bodyParser = require('body-parser'),
    express = require('express');

module.exports = (app, config) => {

    app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(express.static(config.rootPath + '/client'));//ubicación de los documentos de cliente con el que se comunicará el servidor
};
