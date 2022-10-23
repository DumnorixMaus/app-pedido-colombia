import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UmedidaPage } from './umedida.page';

const routes: Routes = [
  {
    path: '',
    component: UmedidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UmedidaPageRoutingModule {}
