import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UmedidaPageRoutingModule } from './umedida-routing.module';

import { UmedidaPage } from './umedida.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UmedidaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UmedidaPage]
})
export class UmedidaPageModule {}
