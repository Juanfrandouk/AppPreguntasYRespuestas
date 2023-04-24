import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {
  nombreUsuario: string;
  listCuestionarios: Cuestionario[] = [];
  loading = false;
  constructor(private loginService: LoginService,
    private cuestionarioService: CuestionarioService,
    private toastr: ToastrService) {

  };

  ngOnInit(): void {
    this.getNombreUsuario();
    this.getCuestionarios();
  }
  getNombreUsuario(): void {
    this.nombreUsuario = this.loginService.getTokenDecode().sub;
  }
  getCuestionarios(): void {
    this.loading = true;
    this.cuestionarioService.getListCuestionarioByUser().subscribe(
      data => {
        this.listCuestionarios = data;
       // console.log(this.listCuestionarios);
      }, error => {
        console.log(error.error);
        this.loading = false;
      }

    );
    this.loading = false;
  }
  EliminarCuestionario(idCuestionario: number): void {
    if (confirm('Esta seguro que desea eliminar el cuestionario')) {
      this.loading = true;
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(
        data => {
          this.toastr.success('El cuestionario fue eliminado conexito !', 'Registro Eliminado');
          this.getCuestionarios();
        }, error => {
          this.toastr.error('Imposible ejecutar operacion para eliminar !', 'Error');
          this.loading = false;
          this.getCuestionarios();
        });
    }

    this.loading = false;
  }
}
