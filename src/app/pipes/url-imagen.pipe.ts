import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlImagen'
})
export class UrlImagenPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
