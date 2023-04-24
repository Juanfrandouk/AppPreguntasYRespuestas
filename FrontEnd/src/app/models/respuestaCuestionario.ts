import { RespuestaCuestionarioDetalle } from "./respuestaCuestionarioDetalle";

export class RespuestaCuestionario{
    id?: number;
    cuestionarioId : number;
    nombreParticipante: string;
    ListRtaCuestionarioDetalle : RespuestaCuestionarioDetalle[];
    fecha ?: Date;
    activo?: number;
   
}