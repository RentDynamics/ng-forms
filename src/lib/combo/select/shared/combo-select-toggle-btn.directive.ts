import { Directive, ElementRef, HostListener } from '@angular/core';

import { ComboSelectComponent } from '../combo-select.component';

@Directive({
  selector: '[rdComboSelectToggleBtn]'
})
export class ComboSelectToggleBtnDirective {

  public elem: HTMLElement = null;

  constructor(private comboSelect: ComboSelectComponent, elementRef: ElementRef) {
    this.elem = elementRef.nativeElement;
  }

  @HostListener('click', ['$event']) onClick($event: UIEvent){
    this.comboSelect.toggle.emit(!this.comboSelect.open);
  }
}
