import { Input, Output, EventEmitter } from '@angular/core';

import { Option } from './option';

export interface Select {
    id?: number;
    ngModel: any;
    change: EventEmitter<any>;
    multiple?: boolean;
    nullable?: boolean;
    open: boolean;
    options: Option[];
    ngModelChange$?: EventEmitter<any>;
    optionChange$?: EventEmitter<Option>;

    addOption(option: any): void;
    getActiveOption?(): Option;
    removeOption(option: any): void;
    setNgModel(newVal: any): void;
    toggle?(newVal?: boolean): boolean;
}
