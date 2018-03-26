const mongoose = require('mongoose')
const Schema = mongoose.Schema

let EventosSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true},
  start: { type: String, required: true},
  end: { type: String, required: true},
  hstart:{ type: String, required: false},
  hend:{ type: String, required: false},
  fk_usuario: { type: String, required: false}
});

let eventoModel = mongoose.model('Eventos', EventosSchema);
module.exports = eventoModel;