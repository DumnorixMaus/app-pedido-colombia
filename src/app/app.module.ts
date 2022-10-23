import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RotaImagenDirective } from './directives/rota-imagen.directive';
import { SkeletonListDirective } from './directives/skeleton-list.directive';
import { HttpClientModule } from '@angular/common/http';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

@NgModule({
  declarations: [
                  AppComponent,
                  RotaImagenDirective,
                  SkeletonListDirective
                ],
  imports: [
              BrowserModule,
              IonicModule.forRoot(),
              AppRoutingModule,
              HttpClientModule,
              FormsModule,
              ReactiveFormsModule,
              CommonModule
           ],
  providers: [
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                Vibration
             ],
  bootstrap: [
                AppComponent
             ],
})
export class AppModule {}
