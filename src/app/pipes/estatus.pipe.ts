import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatus'
})
export class EstatusPipe implements PipeTransform {
  //1.- Activo 0.- Inactivo

  transform(value: any): unknown {
    let estatus = 'Ninguno';
    switch (value) {
      case 1:
        estatus = 'Activo';
       break;
       case 0:
        estatus = 'Inactivo';
       break;
      default:
        estatus = 'Ninguno';
      break;
    }
    return estatus;
  }

}
