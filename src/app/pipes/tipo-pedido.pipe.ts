import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoPedido'
})
export class TipoPedidoPipe implements PipeTransform {
 //1.- App 2.- Local

 transform(value: any): unknown {
  let estatus = 'App';
  switch (value) {
    case 1:
      estatus = 'App';
     break;
     case 2:
      estatus = 'Local';
     break;
    default:
      estatus = 'App';
    break;
  }
  return estatus;
}

}
