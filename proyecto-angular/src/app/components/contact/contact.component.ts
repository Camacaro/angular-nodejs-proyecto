// ==========================
// Para utilizar el selector de angular hay que importar ViewChild
// ==========================
import { Component, OnInit, ViewChild } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	public widthSlder:number;
    public anchuraToSlider:any;
    public captions:boolean;
    public autor:any;

    // ====================================================
    // recoger el nombre del DOM #, esto sive como selector
    // ===================================================
    @ViewChild('textos') textos;

  	constructor() { 
        this.captions = false;
  	}

    ngOnInit() {
        var opcion_clasica = $('#texto').html();
        console.log(this.textos);
        console.log(this.textos.nativeElement.textContent);
    }

    cargarSlider(){
        this.anchuraToSlider = this.widthSlder;
    }

    resetearSlider() {
        this.anchuraToSlider = false;
    }

    getAutor(event){
        //console.log(event);
        this.autor = event;
    }

}
