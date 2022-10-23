import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatusPedido'
})
export class EstatusPedidoPipe implements PipeTransform {
  //1.- Pendente 2.- Recibido 3.- Entregado 4.- Cancelado
  transform(value: any): unknown {
    let estatus = 'Ninguno';
    switch (value) {
      case 1:
        estatus = 'Pendente';
       break;
       case 2:
        estatus = 'Recibido';
       break;
       case 3:
        estatus = 'Entregado';
       break;
       case 4:
        estatus = 'Cancelado';
       break;
      default:
        estatus = 'Ninguno';
      break;
    }
    return estatus;
  }

}
