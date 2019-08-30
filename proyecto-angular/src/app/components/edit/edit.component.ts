import { Component, OnInit } from '@angular/core';
// =====================
// Importar Servicio
// =====================
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
// =====================
// Importar Modelo
// =====================
import { Project } from '../../models/project';
import {Global} from '../../services/global';
// =====================
// Para el redireccionamiento y obtencion de datos por parametro GET
// =====================
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

	public title:string;
	public project:Project;
	public status:string;
    public filesToUpload:Array<File>;
    public save_project;
    public url:string;

  	constructor( 
  		private _projectService:ProjectService,
  	 	private _uploadService:UploadService,
  		private _router:Router,
  		private _route:ActivatedRoute
  	 ) {
  		this.title = "Editar Proyecto";
  		this.project = new Project('', '', '', '', 2019, '', '');
  		this.url = Global.url;
  	}

 	ngOnInit() {
 		this._route.params.subscribe(params => {
  			let id = params.id;

  			this.getProject(id);
  		});
  	}

  	getProject(id){
  		this._projectService.getProject(id).subscribe(
  			
  			response => {
  				console.log(response);
  				this.project = response.projectDB
  			},

  			error => {
  				console.log(error)
  			}
  		);
  	}

  	onSubmit(){
  		// ==========================
		// el subscribe me permite recoger lo que devuelva la api
		// ==========================
  		this._projectService.updateProject( this.project ).subscribe( 
  			response => {
                if(response.project){
                    // ==========
                    // Subir Img
                    // ==========
                    let ruta:string = Global.url+'upload-image/'+response.project._id;
                    // ==========================================================================================
                    // parametro 1 : a donde se va a enviar
                    // parametro 2 : parametros que se pudieran enviar, en este caso vacio
                    // parametro 3 : archivo a enviar
                    // parametro 4 : nombre que tendra el archivo a captutar ej <input type="file" name="image" >
                    // ==========================================================================================
                    // Si se subu un archivo lo actualizamos, sino se mantiene la otra
                    if( this.filesToUpload){
                    	this._uploadService.makeFileRequest(ruta, [], this.filesToUpload, 'image' ).then((result:any)=>{
	                        this.status = 'success';
	                        //console.log(result);
	                        // ========================================================================================
                        	// this.save_project, es para obtener el id del nuevo registro y redireccionarlo para verlo
                        	// ========================================================================================
	                        this.save_project = result.project;                        
	                    });
                    }else {
                    	this.status = 'success';
						this.save_project = response.project;  
                    }
                    
                }else{
                    this.status = 'failed';
                }
  			},
  			error => {
  				console.log(<any>error);
  			}
  		)
  	}

  	fileChangeEvent(fileInput:any){
        //console.log(fileInput);
        this.filesToUpload = <Array<File>>fileInput.target.files;
        //console.log(this.filesToUpload);

    }

}

