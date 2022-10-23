

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlImagenPipe } from './url-imagen.pipe';
import { TipoPedidoPipe } from './tipo-pedido.pipe';
import { EstatusPedidoPipe } from './estatus-pedido.pipe';
import { EstatusPipe } from './estatus.pipe';
@NgModule({
  declarations: [
    UrlImagenPipe,
    TipoPedidoPipe,
    EstatusPedidoPipe,
    EstatusPipe
  ],
  exports: [
    UrlImagenPipe,
    TipoPedidoPipe,
    EstatusPedidoPipe,
    EstatusPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
