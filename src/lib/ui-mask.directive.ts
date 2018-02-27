import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, NgModel, NgControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { KEYCODE } from './shared';

@Directive({
  selector: '[rdUiMask]',
  providers: [NgModel],
  host: {
    '(keyup)': 'onInputKeyup($event)'
  }
})
export class UiMaskDirective {
  @Input('rdUiMask') mask: string;
  //@Input() decodeModelExp: RegExp = /\D+/g;

  private placeholder: string;
  private placeholderCount: number = 0;

  constructor(private ngModel: NgModel, private ngControl: NgControl) { }

  ngOnInit() {
    let self = this;
    this.placeholder = this.mask.toLowerCase().replace(/(\d|\*|y|m|d|h|s)/g, '_');
    this.placeholder = this.placeholder.replace(/a/g, '__');
    this.placeholderCount = this.queryString(this.placeholder, this.isUnderscore).count;

    //let maskedValue$ = this.ngModel.valueChanges.switchMap((value: string) => this.parse(value));
    this.ngModel.control.valueChanges.subscribe(newVal => {
      if (!newVal)
        return this.ngModel.valueAccessor.writeValue(this.placeholder);

      let count = 0;
      let modelValue: string = newVal.replace(/\D+/g, ''); // \D+ == not digit
      // let modelValue = newVal.replace(/\D+/g, ''); // \W+ == not word
      let validCharacterLength = modelValue.length;
      let viewValue = '';

      for (let i = 0; i < this.placeholder.length; i++) {
        let char = this.placeholder[i];

        if (this.isNotUnderscore(char)) {
          viewValue += char;
          continue;
        }

        // if is underscore, replace underscore with model value character code at relevant index
        viewValue += modelValue[count] || '_';
        count++;
      }

      this.setViewValue(viewValue);

      if(validCharacterLength > this.placeholderCount)
        modelValue = modelValue.substring(0, this.placeholderCount);

      this.setModelValue(modelValue);
    });
  }

  queryString(newVal: string, truthSeekingExpression: Function) {
    let queryResult: { count: number, queryString: string } = {
      count: 0,
      queryString: ''
    };
    for (let i = 0; i < this.placeholder.length; i++) {
      let char = this.placeholder[i];
      // if not underscore
      if (truthSeekingExpression(char)) {
        queryResult.count++;
        queryResult.queryString += char;
      }
    }
    return queryResult;
  }

  isUnderscore(char: string) {
    return /\_/g.test(char);
  }

  isNotUnderscore(char: string) {
    return /[^_]/g.test(char);
  }

  onInputKeyup(event: KeyboardEvent) {
    // let newVal = this.ngModel.value;
    // let viewValue: string = this.ngModel.viewModel;
    // let modelValue: string = newVal.replace(/\D+/g, '');

    // if (event.keyCode === KEYCODE.BACKSPACE){
    //   modelValue = modelValue.substring(0, this.placeholderCount);
    //   this.setModelValue(modelValue);
    // }

    // // if (!newVal)
    // //   return this.setViewValue(this.placeholder);

    // console.log([event, newVal, modelValue, viewValue]);
  }

  setViewValue(newVal: string) {
    this.ngModel.valueAccessor.writeValue(newVal);
  }

  setModelValue(newVal: string) {
    this.ngModel.viewToModelUpdate(newVal);
  }

  // parse(value: string) {
  //   return Observable.create(`(435) 890-9518`);
  // }

  // isValidMask() {
  //   return this.mask.match(/(\*|\9|\(|\)|\-)+/);
  // }

  // replace() {
  //   let charAry: string[] = this.mask.split(/(\*|\9|\(|\)|\-)+/)
  // }
}
