'use strict';
//modelo de evento, en esta sección se establecen las conexiones con la base de datos y los comandos que las ejecutan
module.exports = function(db) {

    const Eventos = db.collection('eventos');//conexión con la colección eventos

    this.recibirEventos = (id, callback) => {

        Eventos.find({nomusu: id}).toArray((err, docs) => {//busca los eventos del usurio logueado con id
            if (err) 
                callback(err);
            else
                callback(null, docs);
        });
    };

    this.actualizarEvento = (id, reg, callback) => {
        Eventos.findOneAndUpdate({_id: id}, {$set: {start: reg.ini, end: reg.fin}}, (err, doc) => {//busca y actualiza los eventos del documento por id
            if (err)
                callback(err);
            else
                callback(null, {resultado: doc.ok});
        });
    };

    this.agregarEvento = (doc, callback) => {

        Eventos.insert(doc, (err, doc) => {//creación del nuevo evento
            if (err)
                callback(err);
            else
                callback(null, {id: doc.insertedIds[0], total: doc.insertedCount});
        });
    };

    this.eliminarEvento = (id, callback) => {//Eliminar el evento con id
        Eventos.remove({_id: id}, (err, doc) => {
            if (err)
                callback(err);
            else
                callback(null, doc.result);
        });
    };
};
