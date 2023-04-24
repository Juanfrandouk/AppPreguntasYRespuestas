import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  idCuestionario: number;
  loading = false;
  listRespuestaCuestionario: RespuestaCuestionario[]=[];

  constructor(private aRoute: ActivatedRoute,
    private respuestaCuestionarioService: RespuestaCuestionarioService,
    private toastr: ToastrService) {
    this.idCuestionario = +this.aRoute.snapshot.paramMap.get('id');    
  }

  ngOnInit(): void {
    this.getListCuestionarioService();
  }
  getListCuestionarioService(): void {
    this.loading= true;
    this.respuestaCuestionarioService
      .getListCuestionarioRespuesta(this.idCuestionario)
      .subscribe(data=>{
        
        this.listRespuestaCuestionario= data
      //console.log(this.listRespuestaCuestionario);
        this.loading= false;

      },error=>{
        this.loading= false;
      
      });      
  }
  eliminarRespuestaCuestionario(idRtaCuestionario:number ):void
  { this.loading= true;
    this.respuestaCuestionarioService.eliminarRespuestaCiuestionario(idRtaCuestionario)
        .subscribe(data=>{
          this.toastr.info('Respuesta eliminada satisfactoriamente','registro eliminado');
          this.getListCuestionarioService();
          this.loading= false;
        },error=>{
          this.loading= false;});
  }
}
