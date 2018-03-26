const RouterEventos=require('express').Router();
const Eventos = require('./eventoModel.js');
const Users = require('./usuariosModel.js');


RouterEventos.get('/all',function(req,res){
	Eventos.find({}).exec(function(err,docs){
		if(err){
			res.status(500)
			res.json(err)
		}
		res.json(docs)
	})
})

RouterEventos.get('/cargarEventos',function(req,res){
	Eventos.find({},{"_id":0,"title":1,"start":1,"end":1}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

RouterEventos.post('/agregarEvento', function(req, res){
	let evento = new Eventos({
		id: req.body.id,
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		hstart:req.body.hstart,
		hend: req.body.hend	
	})
	
	evento.save(function(error){
		if(error){
			res.status(500)
			res.json(error)
		}
		res.send("Nuevo evento agregado")
	})
})


RouterEventos.post('/eliminarEvento/:id',function(req,res){
	req.session.reload(function(err){
		if(err){
			console.log(err);
			res.json("logout");
		}else{
			let uid = req.params.id
			evento.remove({id: uid}, function(error) {
			if(error) {
				res.status(500)
				res.json(error)
			}
        res.send("Registro eliminado")
		})
		}
	
	})
})

RouterEventos.post('/actulizarEvento',function(req,res){
	//res.send(req.body._id)
	var MongoClient = require('mongodb').MongoClient;
	
	
	// let evento=new Eventos({
		// id:req.body.id,
		// start:req.body.start,
		// end:req.body.end,
		// hstart:req.body.hstart,
		// hend:req.body.hend
	// })
	
	// evento.updateOne(function(error){
		// if(error){
			// res.status(500)
			// res.json(error)
		// }
		// res.send("Evento actualizado")
	// })
	
	MongoClient.connect('mongodb://localhost/agenda', function(err, db) {
	  if (err) throw err;
	  var id = { id: req.body.id };
	  var newvalues = { $set: {start: req.body.start, end:req.body.end  } };
	  dbo.collection("eventos").updateOne(id, newvalues, function(err, res) {
		if (err) throw err;
		console.log("1 document updated");
		db.close();
	  });
	});
	
})
	


module.exports=RouterEventos