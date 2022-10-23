import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormClienteComponent } from 'src/app/components/form-cliente/form-cliente.component';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
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
    this.dats.clientes().subscribe( (data: any) => {
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
          component: FormClienteComponent,
          componentProps: {
            titulo: 'Registrar',
            cliente: ''
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
