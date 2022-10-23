import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormPedidoComponent } from './../form-pedido/form-pedido.component';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-list-pedido',
  templateUrl: './list-pedido.component.html',
  styleUrls: ['./list-pedido.component.scss'],
})
export class ListPedidoComponent implements OnInit {
  @Input() pedidos: any = [1,2];
  currentModal = null;
  pageEl = document.querySelector('.ion-page');

  constructor(private modalController: ModalController,
              public dats: DatosService) { }

  ngOnInit() {}

  async openModal(opts = {}, datos = {}) {
    const modal = await this.modalController.create({
      component: FormPedidoComponent,
      backdropDismiss: false,
      componentProps: {
        titulo: 'Actualizar',
        pedido: datos
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
      breakpoints: [0, 0.2, 0.6, 1],
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

    this.dats.eliminarPedido(data.id_pedido).subscribe((res: any) => {
      console.log('se elimino: ',res);
      this.pedidos.splice(index, 1);
      console.log('Coreecto',res.mensaje);
    }, e => {
      console.log('Error',e);
    });
  }


}
