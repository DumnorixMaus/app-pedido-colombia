import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { FormClienteComponent } from '../form-cliente/form-cliente.component';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.scss'],
})
export class ListClienteComponent implements OnInit {
  @Input() clientes: any;
  currentModal = null;
  pageEl = document.querySelector('.ion-page');

  constructor(public modalController: ModalController,
              public dats: DatosService) { }

  ngOnInit() {}

  async openModal(opts = {}, datos = {}) {
    const modal = await this.modalController.create({
      component: FormClienteComponent,
      backdropDismiss: false,
      componentProps: {
        titulo: 'Actualizar',
        cliente: datos
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

    this.dats.eliminarCatProducto(data.id_cliente).subscribe((res: any) => {
      console.log('se elimino: ',res);
      this.clientes.splice(index, 1);
      console.log('Coreecto',res.mensaje);
    }, e => {
      console.log('Error',e);
    });
  }

}
