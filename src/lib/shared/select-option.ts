import { Input } from '@angular/core';

export interface SelectOption {
  value: any;
  title: any;

  elem: HTMLElement;

  isActive(): boolean;
  setActive(): void;
}
