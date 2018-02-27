import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

import { ComboSelectComponent } from '../combo-select.component';
import { KEYCODE, SelectOption } from '../../../shared/index';

@Directive({
  selector: 'input[rdComboSelectInput]'
})
export class ComboSelectInputDirective {

  public elem: HTMLElement = null;

  constructor(private comboSelect: ComboSelectComponent, elementRef: ElementRef) {
    this.elem = elementRef.nativeElement;
  }

  @HostListener('blur', ['$event']) blur($event: UIEvent) {
    this.syncInputNgModel();
  }
  @HostListener('focus', ['$event']) focus($event: UIEvent) {
    this.selectAllText($event);
  }
  @HostListener('keydown', ['$event']) keydown($event: KeyboardEvent) {
    this.parseKeycode($event);
  }

  selectAllText($event) {
    let inputElem = $event.target;
    inputElem.setSelectionRange(0, inputElem.value.length);
  }

  parseKeycode(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case KEYCODE.UP:
        this.comboSelect.toggle.emit(false);
        break;
      case KEYCODE.DOWN:
        this.comboSelect.toggle.emit(true);
        break;
      case KEYCODE.ENTER:
        this.syncInputNgModel();
        break;
      default:
        break;
    }
  }

  syncInputNgModel() {
    let option: SelectOption = this.comboSelect.lookupOption(this.comboSelect.inputNgModel)[0];

    if (!option)
      this.comboSelect.inputNgModel = this.comboSelect.title;

    if (option && option.value !== this.comboSelect.ngModel)
      this.comboSelect.setNgModel(option.value);
  }
}