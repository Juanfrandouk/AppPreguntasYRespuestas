import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent implements OnInit {
idRespuesta: number;
loading= false;
cuestionario: Cuestionario;
respuestas : RespuestaCuestionarioDetalle[]=[];
  constructor(private aRoute: ActivatedRoute,
              private rtaCuestionarioServ: RespuestaCuestionarioService) {
                this.idRespuesta = +this.aRoute.snapshot.paramMap.get('id');
               }

  ngOnInit(): void {
    this.getListrespuestasyCuestionario();
  }
  getListrespuestasyCuestionario():void{
    this.loading= true;
    this.rtaCuestionarioServ.getCuestionarioByIdRespuesta(this.idRespuesta)
                            .subscribe(data=>{
                             this.cuestionario = data.cuestionario;
                             this.respuestas= data.respuestas;
                             this.loading= false;
                             console.log( 'this.cuestionario');
                            console.log( this.cuestionario);
                            console.log( 'this.respuestas');
                            console.log(this.respuestas);
                            },error=>{
                              this.loading= false;
                            })
  }
}
