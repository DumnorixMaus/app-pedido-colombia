import { FormCategoriaComponent } from './../form-categoria/form-categoria.component';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.scss'],
})
export class ListCategoriaComponent implements OnInit {
  @Input() categorias: any;
  currentModal = null;
  pageEl = document.querySelector('.ion-page');

  constructor(public modalController: ModalController,
              public dats: DatosService) { }

  ngOnInit() {}

  async openModal(opts = {}, datos = {}) {
    const modal = await this.modalController.create({
      component: FormCategoriaComponent,
      backdropDismiss: false,
      componentProps: {
        titulo: 'Actualizar',
        categoria: datos
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

    this.dats.eliminarCatProducto(data.id_categoria).subscribe((res: any) => {
      console.log('se elimino: ',res);
      this.categorias.splice(index, 1);
      console.log('Coreecto',res.mensaje);
    }, e => {
      console.log('Error',e);
    });
  }


}
