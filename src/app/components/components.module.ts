import { FormUmedidaComponent } from 'src/app/components/form-umedida/form-umedida.component';
import { FormProductoComponent } from './form-producto/form-producto.component';
import { FormProveedorComponent } from 'src/app/components/form-proveedor/form-proveedor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';

import { ListCategoriaComponent } from './list-categoria/list-categoria.component';
import { ListUmedidaComponent } from './list-umedida/list-umedida.component';
import { ListProveedorComponent } from './list-proveedor/list-proveedor.component';
import { ListProductoComponent } from './list-producto/list-producto.component';
import { ListPedidoComponent } from './list-pedido/list-pedido.component';
import { ListClienteComponent } from './list-cliente/list-cliente.component';
import { HeaderContentComponent } from './header-content/header-content.component';
import { HeaderComponent } from './header/header.component';
import { FormCategoriaComponent } from './form-categoria/form-categoria.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { FormPedidoComponent } from './form-pedido/form-pedido.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { OnlyNumeroDirective } from '../directives/only-numero.directive';

@NgModule({
    entryComponents: [],
    declarations: [
      ListCategoriaComponent,
      ListClienteComponent,
      ListPedidoComponent,
      ListProductoComponent,
      ListProveedorComponent,
      ListUmedidaComponent,
      HeaderComponent,
      HeaderContentComponent,
      FormCategoriaComponent,
      FormPedidoComponent,
      FormClienteComponent,
      FormProveedorComponent,
      FormProductoComponent,
      FormUmedidaComponent,
      OnlyNumeroDirective
    ],
    exports: [
      ListCategoriaComponent,
      ListClienteComponent,
      ListPedidoComponent,
      ListProductoComponent,
      ListProveedorComponent,
      ListUmedidaComponent,
      HeaderComponent,
      HeaderContentComponent,
      FormCategoriaComponent,
      FormPedidoComponent,
      FormClienteComponent,
      FormProveedorComponent,
      FormProductoComponent,
      FormUmedidaComponent
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      PipesModule,
      GoogleMapsModule
    ]
  })
  export class ComponentsModule { }
