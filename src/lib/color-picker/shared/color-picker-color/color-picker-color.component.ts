import { Component, Directive, Input, HostBinding, HostListener } from '@angular/core';

import { ColorPickerComponent } from '../../color-picker.component';

@Component({
  selector: '[rd-color-picker-color]',
  templateUrl: './color-picker-color.component.html',
  styleUrls: ['./color-picker-color.component.less'],
})
export class ColorPickerColorComponent {
  @HostBinding('style.backgroundColor') @Input() backgroundColor: string;
  @HostBinding('style.color') @Input() color: string;

  constructor(private colorPickerParent: ColorPickerComponent) { }

  isSelected($event: UIEvent){
    return this.colorPickerParent.ngModel && 
      this.colorPickerParent.ngModel.backgroundColor === this.backgroundColor &&
      this.colorPickerParent.ngModel.color === this.color;
  }

  @HostListener('click', ['$event']) onClick($event: UIEvent){
    $event.preventDefault();
    $event.stopImmediatePropagation();

    this.colorPickerParent.setNgModel({ 
      color: this.color,
      backgroundColor: this.backgroundColor
    });
  }
}
