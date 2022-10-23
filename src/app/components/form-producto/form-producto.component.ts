import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';
import { DispositivoService } from 'src/app/services/dispositivo.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
})
export class FormProductoComponent implements OnInit {
  @Input() titulo: string;
  @Input() producto: any;

  registroForm: FormGroup;
  nuevo = true;
  idactualiza: any;

  proveedores: any = [];
  categorias: any = [];
  umedidas: any = [];

  constructor(private fb: FormBuilder,
              public dats: DatosService,
              public dis: DispositivoService) {
                this.registroForm = this.fb.group({
                  id_proveedor: ['', [Validators.required]],
                  id_categoria: ['', [Validators.required]],
                  id_unidad_medida: ['', [Validators.required]],
                  codigo: ['', [Validators.required]],
                  costo: ['', [Validators.required]],
                  costo_venta: ['', [Validators.required]],
                  stock: ['', [Validators.required]],
                  stock_minimo: ['', [Validators.required]],
                  nombre: ['',[Validators.required]],
                  descripcion: [''],
                  estatus: [true]
                });

  }

  ngOnInit() {
    this.listadoProveedores();
    this.listadoCategorias();
    this.listadoUnidadMedida();

    if(this.producto){
      setTimeout(() => {
        this.editarFormulario(this.producto);
      }, 400);
    }
  }

   async listadoProveedores(){
     await this.dats.proveedors().subscribe( (data: any) => {
      if(data.error){
        console.log(data.mensaje);

      }else{
        this.proveedores.push(...data.data);
      }

      console.log(this.proveedores);

    }, e => console.error('Hubo un error en el servidor: ',e));
  }

  async listadoCategorias(){
    await this.dats.catproductos().subscribe( (data: any) => {
      if(data.error){
        console.log(data.mensaje);

      }else{
        this.categorias.push(...data.data);
      }

      console.log(this.categorias);

    }, e => console.error('Hubo un error en el servidor: ',e));
  }

  async listadoUnidadMedida(){
    await this.dats.unidadmedidas().subscribe( (data: any) => {
      if(data.error){
        console.log(data.mensaje);

      }else{
        this.umedidas.push(...data.data);
      }

      console.log(this.umedidas);

    }, e => console.error('Hubo un error en el servidor: ',e));
  }

  limpiarFormulario(){
    this.nuevo = true;
    this.idactualiza = null;
    this.registroForm = this.fb.group({
      id_proveedor: ['', [Validators.required]],
      id_categoria: ['', [Validators.required]],
      id_unidad_medida: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      costo_venta: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      stock_minimo: ['', [Validators.required]],
      nombre: ['',[Validators.required]],
      descripcion: [''],
      estatus: [true]
    });
  }


  editarFormulario(data: any){
    this.nuevo = false;
    this.idactualiza = data.id_producto;

    this.registroForm = this.fb.group({
      id_proveedor: [data.id_proveedor, [Validators.required]],
      id_categoria: [data.id_categoria, [Validators.required]],
      id_unidad_medida: [data.id_unidad_medida, [Validators.required]],
      codigo: [data.codigo, [Validators.required]],
      costo: [data.costo, [Validators.required]],
      costo_venta: [data.costo_venta, [Validators.required]],
      stock: [data.stock, [Validators.required]],
      stock_minimo: [data.stock_minimo, [Validators.required]],
      nombre: [data.nombre,[Validators.required]],
      descripcion: [data.descripcion],
      estatus: [(data.estatus === 1) ? true : false ]
    });
  }


  itemGuardarEditar(){
    if (this.registroForm.invalid) {
      return;
    }
    console.log('registroForm', this.registroForm.value);

    if(this.nuevo){

      this.dats.nuevoProducto(this.registroForm.value).subscribe((res: any) => {
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

      this.dats.actualizarProducto(this.registroForm.value,this.idactualiza).subscribe((res: any) => {
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
