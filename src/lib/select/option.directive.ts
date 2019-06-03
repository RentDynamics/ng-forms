import { Directive, Input, Output, EventEmitter, OnInit, HostBinding, HostListener } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

import { equals, ImmutableService } from '@rd/core';
import { Option } from './option';
import { Select } from './select';

@Directive({
  selector: '[rdOption]',
  exportAs: 'rdOption'
})
export class OptionDirective implements OnInit, Option, Highlightable {
  @Input() select: Select;
  @Input() title: string;
  @Input() value: any;
  @HostListener('click', ['$event']) click(event?: any) {
    return this.setActive();
  };
  @HostBinding('hidden') get isHidden() {
    return this.hidden;
  }
  @HostBinding('class.highlight') get isHighlighted() {
    return this._isHighlighted;
  }

  hidden: boolean = false;
  private _isHighlighted = false;

  constructor(private immutable: ImmutableService) { }

  ngOnInit() {
    if (!this.select)
      return console.warn('Select not provided to OptionDirective');
    if (!this.immutable)
      return console.warn('ImmutableService not provided to OptionDirective');

    this.select.addOption(this);
  }

  isActive() {
    if (!this.select)
      return false;

    if (this.select.multiple)
      return this.isActiveMultiple();

    return equals(this.select.ngModel, this.value);
  }

  setActive() {
    if (this.select.multiple)
      return this.setActiveMultiple();

    return this.setActiveSingle();
  }

  getLabel() {
    return this.title || this.value;
  }

  setActiveStyles() {
    this._isHighlighted = true;
  }

  setInactiveStyles() {
    this._isHighlighted = false;
  }

  protected isActiveMultiple() {
    return this.select && this.select.ngModel && this.select.ngModel.length &&
      this.select.ngModel.findIndex(ngModelItem => equals(ngModelItem, this.value)) > -1;
  }

  protected setActiveSingle() {
    if (this.select.ngModel === this.value && this.select.nullable)
      return this.select.setNgModel(null);
    this.select.setNgModel(this.value);
    this.select.open = false;
  }

  protected setActiveMultiple() {
    if (!this.isActive()) {
      let newVal = this.immutable.push(this.select.ngModel || [], this.value);
      this.select.setNgModel(newVal);
    } else {
      let index = this.select.ngModel.findIndex(ngModelItem => equals(ngModelItem, this.value));
      let newVal = this.immutable.delete(this.select.ngModel, index);
      this.select.setNgModel(newVal);
    }
  }
}
