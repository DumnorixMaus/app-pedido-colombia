import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { FormProveedorComponent } from '../form-proveedor/form-proveedor.component';

@Component({
  selector: 'app-list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.scss'],
})
export class ListProveedorComponent implements OnInit {
  @Input() proveedores: any;
  currentModal = null;
  pageEl = document.querySelector('.ion-page');

  constructor(public modalController: ModalController,
              public dats: DatosService) { }

  ngOnInit() {}

  async openModal(opts = {}, datos = {}) {
    const modal = await this.modalController.create({
      component: FormProveedorComponent,
      backdropDismiss: false,
      componentProps: {
        titulo: 'Actualizar',
        proveedor: datos
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
      initialBreakpoint: 0.8,
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

    this.dats.eliminarProveedor(data.id_proveedor).subscribe((res: any) => {
      console.log('se elimino: ',res);
      this.proveedores.splice(index, 1);
      console.log('Coreecto',res.mensaje);
    }, e => {
      console.log('Error',e);
    });
  }

}
