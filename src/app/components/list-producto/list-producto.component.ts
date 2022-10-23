import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { FormProductoComponent } from '../form-producto/form-producto.component';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.scss'],
})
export class ListProductoComponent implements OnInit {
  @Input() productos: any;
  currentModal = null;
  pageEl = document.querySelector('.ion-page');

  constructor(public modalController: ModalController,
              public dats: DatosService) { }

  ngOnInit() {}

  async openModal(opts = {}, datos = {}) {
    const modal = await this.modalController.create({
      component: FormProductoComponent,
      backdropDismiss: false,
      componentProps: {
        titulo: 'Actualizar',
        producto: datos
      },
      ...opts,
    });
    modal.present();

    this.currentModal = modal;

    const { data } = await modal.onWillDismiss();
    if(data.dismissed){
      this.ngOnInit();
    }
  }

   openSheetModal(datos: any) {
    this.openModal({
      breakpoints: [0, 0.2, 0.8, 1],
      initialBreakpoint: 1,
    }, datos);
  }

   dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }

  itemEliminar(data: any, index: number){

    this.dats.eliminarProducto(data.id_producto).subscribe((res: any) => {
      console.log('se elimino: ',res);
      this.productos.splice(index, 1);
      console.log('Coreecto',res.mensaje);
    }, e => {
      console.log('Error',e);
    });
  }

}
