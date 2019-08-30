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

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  	// =====================
	// Importar Servicio
	// =====================
	providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

	public title:string;
	public project:Project;
	public status:string;
    public filesToUpload:Array<File>;
    public save_project;

  	constructor( private _projectService:ProjectService, private _uploadService:UploadService ) {
  		this.title = "Crea Proyecto";
  		this.project = new Project('', '', '', '', 2019, '', '');
  	}

  	ngOnInit() {
  	}

  	onSubmit(formulario){
  		//console.log(this.project);
  		// ==========================
		// el subscribe me permite recoger lo que devuelva la api
		// ==========================
  		/*this._projectService.saveProject( this.project ).subscribe( (response, error) => {  			
  			if(error){
  				console.log(error);
  			}

  			if(response.ok == true){
  				this.status = 'success';
  				// ===========================
  				// vacia el formulario
  				// ===========================
  				formulario.reset();
  			}else{
  				this.status = 'failed';
  			}

  			//console.log(response);
  		} );*/

  		this._projectService.saveProject( this.project ).subscribe( 
  			response => {
  				//console.log(response);
                if(response.project){
                    //this.status = 'success';
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
                    if( this.filesToUpload){
                        this._uploadService.makeFileRequest(ruta, [], this.filesToUpload, 'image' ).then((result:any)=>{
                            this.status = 'success';
                            console.log(result);
                            // ========================================================================================
                            // this.save_project, es para obtener el id del nuevo registro y redireccionarlo para verlo
                            // ========================================================================================
                            this.save_project = result.project;
                            formulario.reset();
                        });
                    }else{
                        this.status = 'success';
                        this.save_project = response.project;
                        formulario.reset();
                    }
                    
                    //formulario.reset();
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
