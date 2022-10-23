import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumero]'
})
export class OnlyNumeroDirective {

  constructor(private readonly elRef: ElementRef) { }
  @HostListener('input', ['$event'])
  onChangeInput(event: Event): void {
    console.log('Directiva solo numeros: ', this.elRef.nativeElement.value);
    const numbersOnly = /[^0-9]*/g;
    const initVal = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initVal.replace(numbersOnly, '');
    if(initVal !== this.elRef.nativeElement.value){
      event.stopPropagation();
    }
  }
}
