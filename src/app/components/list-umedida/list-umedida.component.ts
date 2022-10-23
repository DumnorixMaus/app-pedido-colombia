import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { FormUmedidaComponent } from '../form-umedida/form-umedida.component';

@Component({
  selector: 'app-list-umedida',
  templateUrl: './list-umedida.component.html',
  styleUrls: ['./list-umedida.component.scss'],
})
export class ListUmedidaComponent implements OnInit {
  @Input() umedidas: any;
  currentModal = null;
  pageEl = document.querySelector('.ion-page');

  constructor(public modalController: ModalController,
              public dats: DatosService) { }

  ngOnInit() {}

  async openModal(opts = {}, datos = {}) {
    const modal = await this.modalController.create({
      component: FormUmedidaComponent,
      backdropDismiss: false,
      componentProps: {
        titulo: 'Actualizar',
        umedida: datos
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
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.5,
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

    this.dats.eliminarUnidadMedida(data.id_unidad_medida).subscribe((res: any) => {
      console.log('se elimino: ',res);
      this.umedidas.splice(index, 1);
      console.log('Coreecto',res.mensaje);
    }, e => {
      console.log('Error',e);
    });
  }

}
