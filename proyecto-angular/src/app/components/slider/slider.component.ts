// =============
// Input : es para recoger variables pasadas por parametro en la etiqueta app-slider Padre-hijo
// Output: enviar parametros del component hijo al pardre
// EventEmiter: crear eventos para enviar
// =============
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

	// ======================================
	// Padre-hijo
	// anchura : nombre variable pasada por parametro
	// anchura : recoger parametro y cambiar nombre
	// ======================================
	@Input() anchura:number;
	@Input('etiquetas') captions:boolean;

	// ======================================
	// Crear nuevos eventos para enviar al Padre
	// ======================================
	@Output() conseguirAutor = new EventEmitter();

	public autor:any;

  	constructor() { 
  		this.autor = {
  			nombre:"Jesus Camacaro",
  			website:"solucionesdac.com",
  			youtube:"Soluciones Dac"
  		};
  	}

  	ngOnInit() {
  		$('.galeria').bxSlider({
            mode: 'fade',
            captions: this.captions,
            slideWidth: this.anchura
        });
    
        $('#logo').click(function(e){
            e.preventDefault();
            $('header').css('background', 'green')
                        .css('height', "50px");    
        });
  	}

  	lanzar(event){
  		//console.log(event);
  		this.conseguirAutor.emit(this.autor);
  	}

}
