import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from 'src/app/models/respuesta';


@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {
  nuevaPregunta: FormGroup;
  pregunta: Pregunta;
  rtaCorrecta = 0;
  @Output() enviarPregunta = new EventEmitter<Pregunta>();

  constructor(private fb: FormBuilder,
    private toastr: ToastrService) {
    this.nuevaPregunta = this.fb.group({
      titulo: ['', Validators.required],
      respuestas: this.fb.array([]
      )
    })
  }

  ngOnInit(): void {
    this.agregarRespuestasPorDefecto();
  }
  // Devuelve FormArray de respuesta
  get getRespuestas(): FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }
  //Agregar respuesta al array
  agregarRespuesta(): void {
    this.getRespuestas.push(this.fb.group({
      descripcion: ['', Validators.required],
      esCorrecta: 0
    }));

  }

  agregarRespuestasPorDefecto(): void {
    this.agregarRespuesta();
    this.agregarRespuesta();
  }
  eliminarRespuesta(index: number): void {
    if (this.getRespuestas.length === 2) {
      this.toastr.error('Como minimo la pregunta debe contener 2 respuesta', '¡Error!')
    } else {
      this.getRespuestas.removeAt(index);
    }
  }
  setRespuestaValida(index: number): void {
    console.log('rtaCorrecta: ' + index)
  
    this.rtaCorrecta = index;
  }
  agregarPregunta() {
    //obtenemos el titulo de la pregunta
    const descripcionPregunta = this.nuevaPregunta.get('titulo').value;

    //Obtenemos el array de respuestas
    const arrayRespuestas = this.nuevaPregunta.get('respuestas').value;
    //Creamos un array de respuestas
    const arrayRta: Respuesta[] = [];

    arrayRespuestas.forEach((element, index) => {
      const respuesta: Respuesta = new Respuesta(element.descripcion, false);
    //  console.log('index: ' + index);
      if ( index === this.rtaCorrecta) {
        respuesta.esCorrecta = true;         
      }
      arrayRta.push(respuesta);
    });
    const pregunta: Pregunta = new Pregunta(descripcionPregunta, arrayRta);
   
    this.enviarPregunta.emit(pregunta); 
    this.reset();
  }
  reset(): void {
    this.setRespuestaValida(0);

    this.nuevaPregunta.reset();
    this.getRespuestas.clear();
    this.agregarRespuestasPorDefecto();

  }

}