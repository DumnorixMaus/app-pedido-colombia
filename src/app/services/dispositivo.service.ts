import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private toastCtrl: ToastController,
             private platform: Platform,
             private vibration: Vibration) { }

  // vibracion
  vibrar(tiempo: number = 1000){
    this.vibration.vibrate(tiempo);
   }

  // toast
  async toastMensaje(mensaje: string, color: string = 'success', duracion: number = 2000) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: duracion,
      position: 'top',
      color
    });
    toast.present();
  }

}
