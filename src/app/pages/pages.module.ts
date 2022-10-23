import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';

import { CategoriaPage } from './categoria/categoria.page';
import { UmedidaPage } from './umedida/umedida.page';
import { ReportePage } from './reporte/reporte.page';
import { ProductoPage } from './producto/producto.page';
import { PedidoPage } from './pedido/pedido.page';
import { ClientePage } from './cliente/cliente.page';

@NgModule({
    entryComponents: [],
    declarations: [
      ClientePage,
      PedidoPage,
      ReportePage,
      UmedidaPage,
      CategoriaPage,
      ProductoPage,
    ],
    exports: [
      ClientePage,
      PedidoPage,
      ReportePage,
      UmedidaPage,
      CategoriaPage,
      ProductoPage,
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      PipesModule,
      ComponentsModule
    ]
  })
  export class PagesModule { }
