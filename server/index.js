const http=require('http'), 
path=require('path'),
RouterUsuarios=require('./rutasUsuarios.js')
RouterEventos=require('./rutasEventos.js')
express=require('express'),
bodyParser=require('body-parser'),
mongoose=require('mongoose');


const PORT=8082;
const app=express();

const Server=http.createServer(app);

mongoose.connect('mongodb://localhost/agenda')

app.use(express.static('../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users',RouterUsuarios);
app.use('/eventos',RouterEventos);


Server.listen(PORT, function(){
	console.log('El servidor está preparado: puerto: '+PORT);
});