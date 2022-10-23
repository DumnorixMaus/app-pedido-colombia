import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ComponentsModule } from './../components/components.module';
import { PagesModule } from './../pages/pages.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ComponentsModule,
    PagesModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
