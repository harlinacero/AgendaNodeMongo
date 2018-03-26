const RouterEventos=require('express').Router();
const Eventos = require('./eventoModel.js');
const Users = require('./usuariosModel.js');
var MongoClient= require("mongodb").MongoClient;

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
	Eventos.find({},{"id":0,"title":1,"start":1,"end":1}).exec(function(err, docs) {
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


RouterEventos.post('/eliminar_evento/:id',function(req,res){
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

RouterEventos.post('/actulizar_evento',function(req,res){
	req.session.reload(function(err){
		if(err){
			console.log(err);
			res.json("logout");
		}else{
			let evento=new Eventos({
			id:req.body.id,
			start:req.body.start,
			end:req.body.end
			})
			
			evento.update({id:id}, function(error){
				if(error){
					res.status(500)
					res.json(error)
				}
				res.send("Evento actualizado")
			})
			res.send("Evento actualizado" + req.body.id)
		}
	})
			
	
})
	


module.exports=RouterEventos