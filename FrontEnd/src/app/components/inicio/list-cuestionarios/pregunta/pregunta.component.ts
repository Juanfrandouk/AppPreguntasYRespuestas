import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pregunta } from 'src/app/models/pregunta';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  idCuestionario: number;
  listPreguntas: Pregunta[] = [];
  loading = true;
  rtaConfirmada = false;
  opcionSeleccionada: any;
  index = 0;
  idRespuestaSeleccionada: number;
  listRespuestaDetalle: RespuestaCuestionarioDetalle[] = [];

  constructor(private respuestaCuestionarioService: RespuestaCuestionarioService,
    private cuestionarioService: CuestionarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario
    if (this.idCuestionario == null) {
      this.router.navigate(['/inicio']);
      return;
    }
    this.getCuestionario();

  }
  getCuestionario(): void {
    this.cuestionarioService.getCuestionario(this.idCuestionario)
      .subscribe(data => {
        this.listPreguntas = data.listPreguntas;
        this.loading = false;
        this.respuestaCuestionarioService.cuestionario = data
      });

  }
  obtenerPregunta(): string {
    return this.listPreguntas[this.index].descripcion;
  }

  getIndex(): number {
    return this.index;
  }

  respuestaSeleccionada(respuesta: any, idRespuesta: number) {
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = idRespuesta;

  }

  AddClassOption(respuesta: any): string {
    if (respuesta === this.opcionSeleccionada) {
      return 'active text-light';
    }
    return 'list-group-item';
  }

  siguiente(): void {
    this.respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada);
    //Creamos un objeto RespuestaDetalle
    const detalleRespuesta: RespuestaCuestionarioDetalle = {
      respuestaId: this.idRespuestaSeleccionada
    }
    //Agregamos objeto al array
    this.listRespuestaDetalle.push(detalleRespuesta);

    console.log(this.respuestaCuestionarioService.respuestas);
    this.rtaConfirmada = false;
    this.index++;
    this.idRespuestaSeleccionada = null;
    if (this.index === this.listPreguntas.length) {
      this.guardarRespuestaCuestionario();
    //  this.router.navigate(['/inicio/respuestaCuestionario']);
    }
    

  }
  guardarRespuestaCuestionario(): void {
    const rtaCuestionario: RespuestaCuestionario = {
      cuestionarioId: this.respuestaCuestionarioService.idCuestionario,
      nombreParticipante: this.respuestaCuestionarioService.nombreParticipante,
      ListRtaCuestionarioDetalle: this.listRespuestaDetalle
    };
    this.loading = true;
    this.respuestaCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario)
      .subscribe(data => {
        this.loading = false;
        this.router.navigate(['/inicio/listCuestionarios/respuestaCuestionario']);
      },error=>{
        this.loading = false;
        console.log(error);
      });
  }


}
