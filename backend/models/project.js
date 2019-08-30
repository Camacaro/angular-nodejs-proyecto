'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({

	name:String,
	description:String,
	category:String,
	year:Number,
	langs:String,
	image:String

});

// ==============
// Primer parametro es la identidad, nombre como tal que se guardara en la db es como si fuera la tabla
// mongoose lo que hace es que en la base de datos 'Project' lo convertira en miniscula y lo pluralisa 'projects'
// =====================
module.exports = mongoose.model('Project', ProjectSchema);