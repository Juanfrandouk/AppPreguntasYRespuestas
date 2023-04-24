import { Pregunta } from "./pregunta";
import { Usuario } from "./usuario";

export class Cuestionario {
    id?: number;
    nombre: string;
    descripcion: string;
    fechaCreacion? : Date;
    listPreguntas: Pregunta[];
    usuario?: Usuario;

    constructor(nombre:string,descripcion:string,fechaCreacion:Date, preguntas: Pregunta[],)
    {
        
        this.nombre= nombre;
        this.descripcion = descripcion;
        this.fechaCreacion = fechaCreacion;
        this.listPreguntas = preguntas;
    }


}