import { EventEmitter } from '@angular/core';
import { CoreApiSelectorFilter } from '@rd/core';

export class ApiFilter {
    name: string;
    value: any;
    change?: EventEmitter<CoreApiSelectorFilter>;
}