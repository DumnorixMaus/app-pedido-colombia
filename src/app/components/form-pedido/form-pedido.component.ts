import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';
import { DispositivoService } from 'src/app/services/dispositivo.service';

@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html',
  styleUrls: ['./form-pedido.component.scss'],
})
export class FormPedidoComponent implements OnInit {
  @Input() titulo: string;
  @Input() pedido: any;

  registroForm: FormGroup;
  nuevo = true;
  idactualiza: any;
  clientes: any = [];
  productos: any = [];

  estatus_pedido: any = [{id: 1, nombre: 'Pendente'},{id: 2, nombre: 'Recibido'},{id: 3, nombre: 'Entregado'},{id: 4, nombre: 'Cancelado'}];
  cantidad: any = [];

  pedidoProducto: any = [];
  constructor(private fb: FormBuilder,
              public dats: DatosService,
              public dis: DispositivoService) {
                this.registroForm = this.fb.group({
                  fecha: [this.fechaActual(),[Validators.required]],
                  id_cliente: ['',[Validators.required]],
                  observaciones: [''],
                  productos: [''],
                  monto_total: ['',[Validators.required]],
                  estatus: [1]
                });

  }

  quitar(prod: any, idx: number){

    this.cantidad[idx] = (this.cantidad[idx] === 0) ? 0 : this.cantidad[idx] -= 1;

    if(this.cantidad[idx] === 0){
        const i = this.pedidoProducto.findIndex((d: any) => d.id_producto === prod.id_producto);
        this.pedidoProducto.splice(i);
    }else{
      const i = this.pedidoProducto.findIndex((d: any) => d.id_producto === prod.id_producto);
      this.pedidoProducto[i].cantidad = this.cantidad[idx];
    }
    console.log('eliminados', this.pedidoProducto);
    this.registroForm.get('monto_total')?.setValue(prod.costo_venta * this.cantidad[idx]);

  }

  agregar(prod: any, idx: number){
    if(!this.cantidad[idx]){
      this.cantidad[idx] = 0;
    }
    this.cantidad[idx] = this.cantidad[idx] += 1;

    const i = this.pedidoProducto.findIndex((d: any) => d.id_producto === prod.id_producto);
    console.log('i', i);
      if(i === -1){
        const pedido = {
            id_producto: prod.id_producto,
            costo_unitario: prod.costo_venta,
            cantidad: this.cantidad[idx]
          };

      this.pedidoProducto.push(pedido);
      this.dis.toastMensaje('Se agrego: '+prod.nombre);

      }else{
        const i = this.pedidoProducto.findIndex((d: any) => d.id_producto === prod.id_producto);
        this.pedidoProducto[i].cantidad = this.cantidad[idx];

      }
      this.registroForm.get('monto_total')?.setValue(prod.costo_venta * this.cantidad[idx]);


      console.log('agregados', this.pedidoProducto);

  }

  async listadoClientes(){
    await this.dats.clientes().subscribe( (data: any) => {
     if(data.error){
       console.log(data.mensaje);

     }else{
       this.clientes.push(...data.data);
     }

     console.log(this.clientes);

   }, e => console.error('Hubo un error en el servidor: ',e));
 }

 async listadoProductos(){
  await this.dats.productos().subscribe( (data: any) => {
   if(data.error){
     console.log(data.mensaje);

   }else{
     this.productos.push(...data.data);
   }

   console.log(this.productos);

 }, e => console.error('Hubo un error en el servidor: ',e));
}

  fechaActual(){
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    return hoy.toLocaleDateString();
  }

  ngOnInit() {
    this.listadoClientes();
    this.listadoProductos();
    if(this.pedido){
      setTimeout(() => {
        this.editarFormulario(this.pedido);
      }, 500);
    }
  }


  limpiarFormulario(){
    this.nuevo = true;
    this.idactualiza = null;
    this.pedidoProducto = [];
    this.cantidad = [];

    this.registroForm = this.fb.group({
      fecha: [this.fechaActual(),[Validators.required]],
      id_cliente: ['',[Validators.required]],
      observaciones: [''],
      productos: [''],
      monto_total: ['',[Validators.required]],
      estatus: [1]
    });
  }


  editarFormulario(data: any){
    this.nuevo = false;
    this.idactualiza = data.id_pedido;

    this.registroForm = this.fb.group({
      fecha: [data.fecha,[Validators.required]],
      id_cliente: [data.id_cliente,[Validators.required]],
      observaciones: [data.observaciones],
      monto_total: [data.monto_total,[Validators.required]],
      estatus: [data.estatus]
    });
  }


  itemGuardarEditar(){
    if (this.registroForm.invalid) {
      return;
    }
    console.log('registroForm', this.registroForm.value);

    if(this.nuevo){
      this.registroForm.get('productos')?.setValue(this.pedidoProducto);

      this.dats.nuevoPedido(this.registroForm.value).subscribe((res: any) => {
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
        this.dis.vibrar();
        this.dis.toastMensaje('Problemas con el servidor', 'danger');
        console.log('Error',err);

      });

    }else{

      this.dats.actualizarPedido(this.registroForm.value,this.idactualiza).subscribe((res: any) => {
        console.log('se actualizo: ',res);
        if(res.error){
          console.log('Error',res.mensaje);
          this.dis.vibrar();
          this.dis.toastMensaje(res.mensaje, 'danger');
        }else{
          console.log('Correcto',res.mensaje);
          this.dis.toastMensaje(res.mensaje);

        }
      }, err => {
        console.log('Error',err);
        this.dis.vibrar();
        this.dis.toastMensaje('Problemas con el servidor', 'danger');
      });

    }

  }

}
