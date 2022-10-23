import { FormPedidoComponent } from './../../components/form-pedido/form-pedido.component';
import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  currentModal = null;
  pageEl = document.querySelector('.ion-page');
  lista_registro: any = [];

  constructor(public modalController: ModalController,
              public dats: DatosService) {

               }

  doRefresh(event) {
    setTimeout(() => {
      this.lista_registro = [];
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
    this.listadoRegistros();
  }

  listadoRegistros(){
    this.dats.pedidos().subscribe( (data: any) => {
     if(data.error){
      console.log(data.mensaje);
     }else{
       this.lista_registro.push(...data.data);
     }

     console.log(this.lista_registro);

   }, e => console.error('Hubo un error en el servidor: ',e));
 }

  async openModal(opts = {}) {
        const modal = await this.modalController.create({
          component: FormPedidoComponent,
          componentProps: {
            titulo: 'Registrar',
            pedido: ''
          },
          ...opts,
        });
        modal.present();

        this.currentModal = modal;
      }

       openSheetModal() {
        this.openModal({
          breakpoints: [0, 0.2, 0.8, 1],
          initialBreakpoint: 1,
        });
      }

       openCardModal() {
        this.openModal({
          swipeToClose: true,
          presentingElement: this.pageEl,
        });
      }

       dismissModal() {
        if (this.currentModal) {
          this.currentModal.dismiss().then(() => {
            this.currentModal = null;
          });
        }
      }

}
