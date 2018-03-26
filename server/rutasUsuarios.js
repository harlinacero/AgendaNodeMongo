const RouterUsuarios=require('express').Router();
const Users = require('./usuariosModel.js');

RouterUsuarios.get('/all',function(req,res){
	Users.find({}).exec(function(err,docs){
		if(err){
			res.status(500)
			res.json(err)
		}
		res.json(docs)
	})
})





RouterUsuarios.post('/login',function(req,res){
	Users.find({usuario:req.body.user,password:req.body.pass}, function(err, doc){
		if (err) {
        	res.status(500)
        	res.json(err)
    	}
    	if(doc!=""){
    		res.send("Validado");
    	}else{
    		res.send("no existe usuario");
    	}
    })
	
})



module.exports=RouterUsuarios