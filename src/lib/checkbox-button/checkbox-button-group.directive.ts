import { AfterViewInit, Directive, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';

import { CheckboxButtonComponent } from './checkbox-button.component'

@Directive({
  selector: '[rdCheckboxButtonGroup]'
})
export class CheckboxButtonGroupDirective implements AfterViewInit {
  
  @ContentChildren(CheckboxButtonComponent) checkboxButtonList: QueryList<CheckboxButtonComponent> = new QueryList<CheckboxButtonComponent> ();
  @Output() update = new EventEmitter();

  selectedCheckboxes = [];
  checkboxValues = [];
  constructor() { }

  ngAfterViewInit () {
    this.checkboxButtonList.changes.forEach((checkboxUpdate) => {
      checkboxUpdate._results.forEach((checkboxButton)=>{
        checkboxButton.update.subscribe((newValue) => {
          let keys = Object.keys(newValue);
          keys.forEach((key) => {
            if(newValue[key]){
              this.selectedCheckboxes[key] = newValue[key];
            } else {
              delete this.selectedCheckboxes[key];
            }
          });
          let selectedKeys = Object.keys(this.selectedCheckboxes);
          this.checkboxValues = [];
          selectedKeys.forEach((key)=> {
            this.checkboxValues.push(this.selectedCheckboxes[key]);
          });
          this.update.emit(this.checkboxValues);
        });
      });
    })
  }
}
