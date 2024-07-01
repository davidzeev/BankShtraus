import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMaxDigits]'
})
export class MaxDigitsDirective {
  @Input('appMaxDigits') maxDigits: number = 4;

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = this.el.nativeElement;
    const value = input.value;

    if (value.length > this.maxDigits) {
      input.value = value.slice(0, this.maxDigits);
    }
  }
}