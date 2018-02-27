import { Directive, Input, Output, Optional, EventEmitter, Host, HostBinding, HostDecorator, HostListener } from '@angular/core';

import { ApiFilter} from './api-filter';

@Directive({
  selector: '[rdApiFilter]',
  exportAs: 'rdApiFilter'
})
export class ApiFilterDirective implements ApiFilter {
  @Input('rdApiFilter') name: string;
  @Input() filters = {};

  change = new EventEmitter();

  get value(){
    return this.filters[this.name];
  };

  constructor() { }

}
