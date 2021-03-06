'use strict';

// const bcrypt = require('bcrypt-nodejs');

module.exports = function(db) {

    const Usuarios = db.collection('usuarios');

    this.verificaUsuario = (reg, callback) => {//buscar la existencia del usuario
        let where = {nomusu: reg.user};

        Usuarios.findOne(where, (err, doc) => {//busca del usuario con los valores del form
            console.log(doc);
			if (err) 
                callback(err);
            else if (reg.pass === doc.clave)
                callback(null, doc);
            else
                callback(null, false);
        });
    };
};
