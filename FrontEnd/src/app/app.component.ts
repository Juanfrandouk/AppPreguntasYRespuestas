import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 listEstudiantes : any[]= [
  {nombre:'Juan Diogenes', estado:'Promocionado'},
  {nombre:'Pedro Castillo', estado:'Reprobado'},
  {nombre:'Luis Aragon', estado:'Raspado'},
  {nombre:'Ramon Planas', estado:'Raspado'},
  {nombre:'Nicolas Gomez', estado:'Libre'}
 ]
  
 mostrar = true;
 toogle(){
   this.mostrar= !this.mostrar;
 }
  

}


