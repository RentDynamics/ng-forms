import { Component, OnInit, Input, Output, ContentChild, ElementRef, EventEmitter, Renderer } from '@angular/core';

import { SelectOption } from '../../shared';
import { NgModelInput } from '../../ng-model-input';

export class ComboSelect extends NgModelInput {
    public options: SelectOption[] = [];
    public inputNgModel: string;

    get title(): string { return this._title; };
    set title(newVal: string) {
        if (newVal !== this._title) {
            this._title = newVal;
            this.inputNgModel = newVal;
        }
    }

    private _title: string;

    constructor() {
        super();
    }

    addOption(option: any) {
        this.options.push(option);
    }

    removeOption(optionValue: any) {
        let filteredOptions = this.options.filter(option => option.value === optionValue);
        this.options = this.options.splice(optionValue, 1);
    }
}
