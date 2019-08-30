'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {

	home: function(req, res){
		return res.send({
			message: 'Soy la home'
		});
	},

	test: function(req, res){
		return res.send({
			message: "Soy el metodo o accion de test"
		});
	},

	saveProject: function (req, res) {
		var project = new Project();

		var params = req.body;

		project.name 		= params.name;
		project.description = params.description;
		project.category	= params.category;
		project.year 		= params.year;
		project.langs 		= params.langs;
		project.image 		= null;

		project.save( (err, projectStore)=>{
			if(err){
				return res.status(500).send({
					ok:false,
					err,
					message:"Error al guardar"
				});
			}

			if(!projectStore){
				res.status(404).send({
					ok:false,
					projectStore,
					message: "No se a podido guardar el proyecto"
				});
			}

			return res.status(200).send({
				ok:true,
				project: projectStore
			});

		} );

		/*return res.status(200).send({
			project,
			message: "Metodo saveProject"
		});*/
	},

	getProject: function(req, res){

		var projectId = req.params.id;

		if(projectId == null){
			return res.status(404).send({
				ok:false,
				message: "El proyecto no existe"
			});
		}

		Project.findById(projectId, (err, projectDB)=>{

			if(err){
				return res.status(500).send({
					ok:false,
					err,
					message:"Error al devolver los datos"
				});
			}

			if(!projectDB){
				return res.status(404).send({
					ok:false,
					message: "El proyecto no existe"
				});
			}

			return res.status(200).send({
				ok:true,
				projectDB
			});
		});
	},

	getProjects: function (req, res) {
		// =========================================
		// Primer parametro: where
		// exec: ejecuta el query
		// sort: ordenar - mayor a menor, + menor a mayor
		// =========================================
		Project.find({}).sort('year').exec( (err, projectsDB)=>{
			
			if(err){
				return res.status(500).send({
					ok:false,
					err,
					message:"Error al devolver los datos"
				});
			}

			if(!projectsDB){
				return res.status(404).send({
					ok:false,
					message:"No hay proyectos para mostrar"
				});
			}

			return res.status(202).send({
				ok:true,
				projectsDB
			});

		});
	},

	updateProject: function(req, res){

		var projectId = req.params.id;
		var update = req.body;

		// =========================================
		// Primer arametr: id a buscar
		// 2do parametro: datos actualizar
		// 3ro parametro: grupo de opciones, el new:true es para que devulva el arreglo nuevo
		// =========================================
		Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectDB)=>{

			if(err){
				return res.status(500).send({
					ok:false,
					err,
					message:"Error al actualizar los datos"
				});
			}

			if(!projectDB){
				return res.status(404).send({
					ok:false,
					message:"no existe el proyecto para actualizar"
				});
			}

			return res.status(200).send({
				ok:true,
				project: projectDB
			});


		});
	},

	deleteProject: function(req, res){

		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, projectDelete)=>{
			if(err){
				return res.status(500).send({
					ok:false,
					err,
					message:"Error no se pudo borrar el proyecto"
				});
			}

			if(!projectDelete){
				return res.status(404).send({
					ok:false,
					message:"no se pudo borrar el project"
				});
			}

			return res.status(200).send({
				ok:true,
				project: projectDelete
			});

		});
	},

	uploadImage: function(req, res){

		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){

			// =========================================
			// filePath: obtengo la ruta del archivo
			// fileSplit: separo el string para opbetener el nombre
			// fileName: asigno el nombre
			// extSplit: separo la extencion en array
			// fileExt: obtengo la extencion
			// =========================================
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

			if( extensionesValidas.indexOf( fileExt )  < 0  ){
				// =========================================
				// Borrar archivo ya que la extension no es permitida y ya se subio
				// =========================================
				fs.unlink(filePath, (err)=>{
					
					if(err){
						return res.status(500).send({
							ok:false,
							err,
							message:"Error no se pudo borrar la img al subir, donde la extension no es permitida"
						});
					}

					return res.status(400).json({
						ok:false,
						err: {
							message: 'Las extensiones permitida son ' + extensionesValidas.join(', '),
							ext: fileExt

						}
					});
				});

			}else{
				Project.findByIdAndUpdate(projectId, {image:fileName}, {new:true}, (err, projectUpdate)=>{

					if(err){
						return res.status(500).send({
							ok:false,
							err,
							message:"Error no se pudo actualizar la imagen"
						});
					}

					if(!projectUpdate){
						return res.status(404).send({
							ok:false,
							message:"el project no existe"
						});
					}

					return res.status(200).send({
						ok:true,
						project:projectUpdate
					});
				});
			}

		}else{
			return res.status(200).send({
				ok:false,
				message: fileName
			});
		}
	},

	getImageFile: function(req, res){
		var file = req.params.image;
		var path_file = './upload/'+file;

		fs.exists(path_file, (exists)=>{
			if (exists) {
				return res.sendFile(path.resolve(path_file));
			}else{
				res.status(200).send({
					ok:false,
					message:"No existe la imagen"
				});
			}
		});
	}

}

module.exports = controller;