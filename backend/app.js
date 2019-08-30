'use strict'

var express 	= require('express');
var bodyParser 	= require('body-parser');

var app 		= express();

/******** CARGAR ARCHIVOS DE RUTAS  ********/
var project_routes = require('./routes/project');

/******** MIDDLEWARES  ********/
app.use( bodyParser.urlencoded({extended:false}) );
//cualquier peticion se convertira en json
app.use( bodyParser.json() );


/******** CORS  ********/
// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// ******** RUTAS  ********/
// =========================================
// req: los datos que se envian en la web y son recibidos
// resp: respuesta que envio luego de recibir
// =========================================
/*app.get('/', (req, res) =>{

	res.status(200).send(
		"<h1> Hola mundo </h1>"
	);

});

app.get('/test', (req, res) =>{

	/*res.json({
		ok:true,
		message:"Hola mundo desde mi API nodejs"
	});*

	res.status(200).send({
		ok:true,
		message:"Hola mundo desde mi API nodejs"
	});

});*/

// =========================================
// Puedo agregarle un middleware en el nombre de la ruta
// =========================================
app.use('/api', project_routes);

/******** EXPORTAR  ********/
module.exports = app;