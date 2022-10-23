import { DispositivoService } from './../../services/dispositivo.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss'],
})
export class FormCategoriaComponent implements OnInit {
  @Input() titulo: string;
  @Input() categoria: any;

  registroForm: FormGroup;
  nuevo = true;
  idactualiza: any;

  constructor(private fb: FormBuilder,
              public dats: DatosService,
              public dis: DispositivoService) {
                this.registroForm = this.fb.group({
                  nombre: ['',[Validators.required]],
                  color: ['#943fc1'],
                  imagen: [''],
                  estatus: [true]
                });

  }

  ngOnInit() {
    if(this.categoria){
      this.editarFormulario(this.categoria);

    }
  }


  limpiarFormulario(){
    this.nuevo = true;
    this.idactualiza = null;
    this.registroForm = this.fb.group({
      nombre: ['',[Validators.required]],
      color: ['#943fc1'],
      imagen: [''],
      estatus: [true]
    });
  }


  editarFormulario(data: any){
    this.nuevo = false;
    this.idactualiza = data.id_categoria;

    this.registroForm = this.fb.group({
      nombre: [data.nombre,[Validators.required]],
      color: [data.color],
      imagen: [data.imagen],
      estatus: [(data.estatus === 1) ? true : false ]
    });
  }


  itemGuardarEditar(){
    if (this.registroForm.invalid) {
      return;
    }
    // let e = this.registroForm.controls['estatus'].value;
    // this.registroForm.get('estatus')?.setValue((e) ? 1 : 0);

    console.log('registroForm', this.registroForm.value);

    if(this.nuevo){

      this.dats.nuevoCatProducto(this.registroForm.value).subscribe((res: any) => {
        console.log('se guardo: ',res);

        if(res.error){
          this.dis.vibrar();
          this.dis.toastMensaje(res.mensaje, 'danger');
          console.log('Error',res.mensaje);

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

      this.dats.actualizarCatProducto(this.registroForm.value,this.idactualiza).subscribe((res: any) => {
        console.log('se actualizo: ',res);
        if(res.error){
          this.dis.vibrar();
          this.dis.toastMensaje(res.mensaje, 'danger');
          console.log('Error',res.mensaje);

        }else{
          this.dis.toastMensaje(res.mensaje, 'success');
          console.log('Correcto',res.mensaje);

        }
      }, err => {
        console.log('Error',err);
        this.dis.vibrar();
        this.dis.toastMensaje('Problemas con el servidor', 'danger');

      });

    }

  }



}
