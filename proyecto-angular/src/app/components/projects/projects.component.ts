import { Component, OnInit } from '@angular/core';
// ===============================
// Importando servicio y modelo, 
// ===============================
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

	public projects:Project[];
	public url:string;

  	constructor( private _projectService:ProjectService ) { }


  	ngOnInit() {
  		this.getProjects();
  	}

  	getProjects(){
  		this._projectService.getProjects().subscribe(
  			response => {
  				if(response.projectsDB){
  					this.projects = response.projectsDB;
  					this.url = Global.url;
  				}
  				//console.log(response);
  			},

  			error => {
  				console.log(error);
  			}
  		);
  	}

}
