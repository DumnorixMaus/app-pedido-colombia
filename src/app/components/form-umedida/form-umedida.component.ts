import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';
import { DispositivoService } from 'src/app/services/dispositivo.service';

@Component({
  selector: 'app-form-umedida',
  templateUrl: './form-umedida.component.html',
  styleUrls: ['./form-umedida.component.scss'],
})
export class FormUmedidaComponent implements OnInit {
  @Input() titulo: string;
  @Input() umedida: any;

  registroForm: FormGroup;
  nuevo = true;
  idactualiza: any;

  constructor(private fb: FormBuilder,
              public dats: DatosService,
              public dis: DispositivoService) {
                this.registroForm = this.fb.group({
                  nombre: ['',[Validators.required]],
                  siglas: [''],
                  estatus: [true]
                });

  }

  ngOnInit() {
    if(this.umedida){
      this.editarFormulario(this.umedida);
    }
  }


  limpiarFormulario(){
    this.nuevo = true;
    this.idactualiza = null;
    this.registroForm = this.fb.group({
      nombre: ['',[Validators.required]],
      siglas: [''],
      estatus: [true]
    });
  }


  editarFormulario(data: any){
    this.nuevo = false;
    this.idactualiza = data.id_unidad_medida;

    this.registroForm = this.fb.group({
      nombre: [data.nombre,[Validators.required]],
      siglas: [data.siglas],
      estatus: [(data.estatus === 1) ? true : false ]
    });
  }


  itemGuardarEditar(){
    if (this.registroForm.invalid) {
      return;
    }
    console.log('registroForm', this.registroForm.value);

    if(this.nuevo){

      this.dats.nuevoUnidadMedida(this.registroForm.value).subscribe((res: any) => {
        console.log('se guardo: ',res);

        if(res.error){
          console.log('Error',res.mensaje);
          this.dis.vibrar();
          this.dis.toastMensaje(res.mensaje, 'danger');
        }else{
          console.log('Correcto',res.mensaje);
          this.dis.toastMensaje(res.mensaje, 'success');

          this.limpiarFormulario();
        }

      }, err => {

        console.log('Error',err);
        this.dis.vibrar();
        this.dis.toastMensaje('Problemas con el servidor', 'danger');
      });

    }else{

      this.dats.actualizarUnidadMedida(this.registroForm.value,this.idactualiza).subscribe((res: any) => {
        console.log('se actualizo: ',res);
        if(res.error){
          console.log('Error',res.mensaje);
          this.dis.vibrar();
          this.dis.toastMensaje(res.mensaje, 'danger');
        }else{
          console.log('Correcto',res.mensaje);
          this.dis.toastMensaje(res.mensaje, 'success');

        }
      }, err => {
        console.log('Error',err);
        this.dis.vibrar();
        this.dis.toastMensaje('Problemas con el servidor', 'danger');
      });

    }

  }

}
